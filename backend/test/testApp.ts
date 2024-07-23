import express from 'express';
import EnrollmentController from '../src/controllers/enrollmentController';
import EnrollmentService from '../src/services/enrollmentService';

const createTestApp = (enrollmentService: EnrollmentService) => {
  const app = express();
  app.use(express.json());

  const enrollmentController = new EnrollmentController(enrollmentService);

  app.post('/api/v1/enroll', enrollmentController.enroll);
  app.get('/api/v1/enrolled-courses', enrollmentController.getEnrolledCourses);

  return app;
};

export default createTestApp;
