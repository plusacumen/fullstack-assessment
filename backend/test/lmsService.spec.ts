import LMSService from "../src/services/lmsService";
import { resetLMSDatabase } from "./testHelper";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { expect, use } from "chai";
import chaiHttp from "chai-http";

import Course from "../src/models/course";

const chai = use(chaiHttp);

let mongoServer: MongoMemoryServer;

before(async function () {
  this.timeout(60000);
  try {
    console.log("Starting MongoMemoryServer...");
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`MongoMemoryServer started at ${uri}`);
    await mongoose.disconnect();
    await mongoose.connect(uri, {
      retryWrites: true,
      w: "majority",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
});
after(async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("MongoMemoryServer stopped");
  } catch (error) {
    console.error("Error stopping MongoMemoryServer", error);
    throw error;
  }
});

describe("LMSService", () => {
  beforeEach(async () => {
    try {
      await mongoose.connection.db.dropDatabase();
      await new Course({
        course_id: "cf95d753-4d1a-4e2e-b44a-a1a09feab110",
        course_name: "How to identify investors who would be a good fit",
      }).save();
    } catch (error) {
      console.error("Error setting up database", error);
      throw error;
    }
  });

  it("should find a course by id", async () => {
    const lmsService = new LMSService();
    const course = await lmsService.findCourseById(
      "cf95d753-4d1a-4e2e-b44a-a1a09feab110"
    );
    expect(course).to.not.be.null;
    expect(course).to.have.property(
      "course_name",
      "How to identify investors who would be a good fit"
    );
  });

  it("should return null if the course does not exist", async () => {
    const lmsService = new LMSService();
    const course = await lmsService.findCourseById("nonexistent-course-id");
    expect(course).to.be.null;
  });

  it("should create a new LMS account", () => {
    const lmsService = new LMSService();
    const account = lmsService.createUserAccount(
      "test@example.com",
      "Test",
      "User"
    );
    expect(account).to.have.property("accountId");
    expect(account).to.have.property("email", "test@example.com");
    expect(account).to.have.property("firstName", "Test");
    expect(account).to.have.property("lastName", "User");
  });

  it("should enroll a user in a course", () => {
    const lmsService = new LMSService();
    const account = lmsService.createUserAccount(
      "test@example.com",
      "Test",
      "User"
    );
    const enrollmentResult = lmsService.enrollUserInCourse(
      account.email,
      "cf95d753-4d1a-4e2e-b44a-a1a09feab110"
    );
    expect(enrollmentResult).to.have.property("success", true);
    expect(enrollmentResult).to.have.property(
      "redirectUrl",
      "https://lms.example.com/courses/cf95d753-4d1a-4e2e-b44a-a1a09feab110"
    );
  });
});
