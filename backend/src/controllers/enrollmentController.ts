import { Request, Response } from "express";
import EnrollmentService from "../services/enrollmentService";

class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor(enrollmentService: EnrollmentService) {
    this.enrollmentService = enrollmentService;
  }

  enroll = async (req: Request, res: Response): Promise<void> => {
    const enrollmentData = req.body.data;

    try {
      const result = await this.enrollmentService.enroll(enrollmentData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  getEnrolledCourses = async (req: Request, res: Response): Promise<void> => {
    const email = req.query.email as string;

    try {
      const enrolledCourses = await this.enrollmentService.getEnrolledCourses(
        email
      );
      res.status(200).json(enrolledCourses);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching enrolled courses",
        error: error.message,
      });
    }
  };
}

export default EnrollmentController;
