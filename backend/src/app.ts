import express, { Request, Response } from "express";
import EnrollmentController from "./controllers/enrollmentController";
import dotenv from "dotenv";
import EnrollmentService from "./services/enrollmentService";

dotenv.config();

const app = express();

app.use(express.json());

const enrollmentService = new EnrollmentService();
const enrollmentController = new EnrollmentController(enrollmentService);

app.get("/api/v1/healthcheck", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/api/v1/enroll", (req: Request, res: Response) =>
  enrollmentController.enroll(req, res)
);

app.get("/api/v1/enrolled-courses", (req: Request, res: Response) =>
  enrollmentController.getEnrolledCourses(req, res)
);

export default app;
