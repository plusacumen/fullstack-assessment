import mongoose, { Document, Schema } from "mongoose";

export interface ISignup extends Document {
  email: string;
  course_id: string;
  course_name: string;
  provider: string;
  external_id: string;
  created_at: Date;
}

const SignupSchema: Schema = new Schema({
  email: { type: String, required: true },
  course_id: { type: String, required: true },
  course_name: { type: String, required: true },
  provider: { type: String, required: true },
  external_id: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const Signup = mongoose.model<ISignup>('Signup', SignupSchema);

export default Signup;
