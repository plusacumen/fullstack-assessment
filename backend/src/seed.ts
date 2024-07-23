const mongoose = require("mongoose");
import Course from "./models/course";
import Signup from "./models/productSignup";
import User from "./models/user";

const mongoUrl = "mongodb://db:27017/assessment-db";

mongoose
  .connect(mongoUrl, {
    retryWrites: true,
    w: "majority",
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Seed data
    const courses = [
      {
        course_id: "1",
        course_name: "Leadership 101",
      },
      {
        course_id: "2",
        course_name: "Marketing Basics",
      },
      {
        course_id: "3",
        course_name: "Sales Techniques for Beginners",
      },
      {
        course_id: "4",
        course_name: "Talent Acquisition Strategies",
      },
      {
        course_id: "5",
        course_name: "Advanced Business Strategy",
      },
      {
        course_id: "6",
        course_name: "Effective Fundraising Methods",
      },
    ];
    await Course.deleteMany({});
    await User.deleteMany({});
    await Signup.deleteMany({});
    // Insert seed data
    return Course.insertMany(courses);
  })
  .then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding data:", err);
  });
