import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb://db:27017/assessment-db",
      {
        retryWrites: true,
        w: "majority",
      }
    );
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
