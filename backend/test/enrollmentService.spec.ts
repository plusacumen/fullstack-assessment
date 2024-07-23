import { expect } from "chai";
import sinon from "sinon";
import EnrollmentService from "../src/services/enrollmentService";
import LMSService from "../src/services/lmsService";
import User from "../src/models/user";
import Signup from "../src/models/productSignup";
import Course from "../src/models/course";

describe("EnrollmentService", () => {
  let enrollmentService: EnrollmentService;
  let lmsServiceStub: sinon.SinonStubbedInstance<LMSService>;

  beforeEach(() => {
    lmsServiceStub = sinon.createStubInstance(LMSService);
    enrollmentService = new EnrollmentService();
    (enrollmentService as any).lmsService = lmsServiceStub; // Injecting the stubbed service
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should enroll a user successfully", async () => {
    const course = new Course({ course_id: "course-id" });
    lmsServiceStub.findCourseById.resolves(course);
    lmsServiceStub.enrollUserInCourse.resolves({
      success: true,
      redirectUrl: "/dashboard",
    });

    // const userStub = sinon.stub(User, "findOne").resolves(null);
    // const userSaveStub = sinon.stub(User.prototype, "save").resolves();

    // const SignupStub = sinon
    //   .stub(Signup.prototype, "save")
    //   .resolves();

    const result = await enrollmentService.enroll({
      email: "test@example.com",
      first_name: "John",
      last_name: "Doe",
      course_id: "course-id",
      course_name: "Test Course",
      provider: "Test Provider",
      external_id: "external-id",
    });

    expect(result).to.deep.equal({
      message: "Enrollment successful",
      redirectUrl: "/dashboard",
    });

    // expect(userStub.calledOnce).to.be.true;
    // expect(userSaveStub.calledOnce).to.be.true;
    // expect(SignupStub.calledOnce).to.be.true;
  });

  it("should return error if course is not found", async () => {
    lmsServiceStub.findCourseById.resolves(null);

    try {
      await enrollmentService.enroll({
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        course_id: "invalid-course-id",
        course_name: "Test Course",
        provider: "Test Provider",
        external_id: "external-id",
      });
    } catch (error) {
      expect(error.message).to.equal("Course not found");
    }
  });

  it("should return error if user already enrolled", async () => {
    const course = new Course({ course_id: "course-id" });
    lmsServiceStub.findCourseById.resolves(course);
    sinon
      .stub(Signup, "findOne")
      .resolves({ email: "test@example.com", course_id: "course-id" } as any);

    try {
      await enrollmentService.enroll({
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        course_id: "course-id",
        course_name: "Test Course",
        provider: "Test Provider",
        external_id: "external-id",
      });
      expect.fail('Expected error not thrown');
    } catch (error) {
      expect(error.message).to.equal("User already enrolled in this course");
    }
  });

  it("should get enrolled courses successfully", async () => {
    const courses = [
      {
        email: "test@example.com",
        course_id: "course-id",
        course_name: "Test Course",
        provider: "Test Provider",
        external_id: "external-id",
        created_at: new Date(),
      },
    ];
    sinon.stub(Signup, "find").returns({
      sort: () => ({
        exec: sinon.stub().resolves(courses),
      }),
    } as any);

    const result = await enrollmentService.getEnrolledCourses(
      "test@example.com"
    );
    expect(result).to.deep.equal(courses);
  });
});
