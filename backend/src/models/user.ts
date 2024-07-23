import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  hasLMSAccount: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
export default User;
