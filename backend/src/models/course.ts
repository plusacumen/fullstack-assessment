import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  course_id: { type: String, required: true, unique: true },
  course_name: { type: String, required: true },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
