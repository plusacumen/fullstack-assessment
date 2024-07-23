import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
  provider: { type: String, required: true },
  external_id: { type: String, required: true },
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
