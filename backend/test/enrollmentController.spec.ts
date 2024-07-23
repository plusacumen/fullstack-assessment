import { expect, use } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import createTestApp from "./testApp";
import EnrollmentService from "../src/services/enrollmentService";
import Signup from "../src/models/productSignup";

const chai = use(chaiHttp);

describe("EnrollmentController", () => {
  let enrollmentServiceStub: sinon.SinonStubbedInstance<EnrollmentService>;
  let app;

  beforeEach(() => {
    enrollmentServiceStub = sinon.createStubInstance(EnrollmentService);
    app = createTestApp(enrollmentServiceStub as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should enroll a user successfully", (done) => {
    enrollmentServiceStub.enroll.resolves({
      message: "Enrollment successful",
      redirectUrl: "/dashboard",
    });

    chai
      .request(app)
      .post("/api/v1/enroll")
      .send({
        data: {
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          course_id: "course-id",
          course_name: "Test Course",
          provider: "Test Provider",
          external_id: "external-id",
        },
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          message: "Enrollment successful",
          redirectUrl: "/dashboard",
        });
        done();
      });
  });

  it("should handle error during enrollment", (done) => {
    enrollmentServiceStub.enroll.rejects(new Error("Course not found"));

    chai
      .request(app)
      .post("/api/v1/enroll")
      .send({
        data: {
          email: "test@example.com",
          first_name: "John",
          last_name: "Doe",
          course_id: "invalid-course-id",
          course_name: "Test Course",
          provider: "Test Provider",
          external_id: "external-id",
        },
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({
          message: "Course not found",
        });
        done();
      });
  });

  it("should get enrolled courses successfully", (done) => {
    const signup = new Signup({
      email: "test@example.com",
      course_id: "course-id",
      course_name: "Test Course",
      provider: "Test Provider",
      external_id: "external-id",
      created_at: new Date("2021-01-01T00:00:00.000Z"),
    });
    enrollmentServiceStub.getEnrolledCourses.resolves([signup]);

    chai
      .request(app)
      .get("/api/v1/enrolled-courses")
      .query({ email: "test@example.com" })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.length).to.equal(1);
        done();
      });
  });

  it("should handle error while fetching enrolled courses", (done) => {
    enrollmentServiceStub.getEnrolledCourses.rejects(
      new Error("An error occurred")
    );

    chai
      .request(app)
      .get("/api/v1/enrolled-courses")
      .query({ email: "test@example.com" })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(500);
        expect(res.body).to.deep.equal({
          message: "An error occurred while fetching enrolled courses",
          error: "An error occurred",
        });
        done();
      });
  });
});
