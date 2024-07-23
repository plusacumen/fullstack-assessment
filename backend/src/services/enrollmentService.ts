import LMSService from "./lmsService";
import User from "../models/user";
import Signup, { ISignup } from "../models/productSignup";
import moment from "moment-timezone";

interface EnrollmentData {
  email: string;
  first_name: string;
  last_name: string;
  course_id: string;
  course_name: string;
  provider: string;
  external_id: string;
}

class EnrollmentService {
  private lmsService: LMSService;

  constructor() {
    this.lmsService = new LMSService();
  }

  async enroll(enrollmentData: EnrollmentData) {
    const {
      email,
      first_name,
      last_name,
      course_id,
      course_name,
      provider,
      external_id,
    } = enrollmentData;

    // Check if course exists in LMS
    const course = await this.lmsService.findCourseById(course_id);
    if (!course) {
      throw new Error("Course not found");
    }

    // Check if user exists in our user database
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, first_name, last_name });
      await user.save();
    }

    // // Check if the user is already enrolled in the course
    // const existingEnrollment = await Signup.findOne({
    //   email,
    //   course_id,
    // });
    // if (existingEnrollment) {
    //   throw new Error("User already enrolled in this course");
    // }

    // Check if user has LMS account
    if (!user.hasLMSAccount) {
      const lmsAccount = this.lmsService.createUserAccount(
        email,
        first_name,
        last_name
      );
      user.hasLMSAccount = true;
      await user.save();
    }

    // Enroll user in the course
    const enrollmentResult = await this.lmsService.enrollUserInCourse(
      user.email,
      course_id
    );

    if (enrollmentResult.success) {
      const courseSignup = new Signup({
        email,
        course_id,
        course_name,
        provider,
        external_id,
        created_at: moment().tz("UTC").format(),
      });
      await courseSignup.save();

      return {
        message: "Enrollment successful",
        redirectUrl: enrollmentResult.redirectUrl,
      };
    } else {
      throw new Error("Failed to enroll user in course");
    }
  }

  async getEnrolledCourses(email: string): Promise<ISignup[]> {
    return Signup.find({ email }).sort({ created_at: -1 }).exec();
  }
}

export default EnrollmentService;
