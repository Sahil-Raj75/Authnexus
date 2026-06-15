// Import mongoose
import mongoose from "mongoose";//reqiure to interact easily to mongodb which is an Object data modeling(ODM) library 
import config from "./config.js";
// Connect to MongoDB using environment variable
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("MongoDB Connected");

  } 
  
  catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;