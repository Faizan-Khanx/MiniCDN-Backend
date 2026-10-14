import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    return console.log(`DATABASE CONNECTED: ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error in connecting the database: ${err.message}`);
    throw  err
  }
};
