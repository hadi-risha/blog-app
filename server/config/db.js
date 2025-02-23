import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config(); 


const connectDB = async () => {
  try {
    console.log("yup its coming here", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
