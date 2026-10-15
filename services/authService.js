import { isExsistingUser } from "../utils/authHelper.js";
import { GenPass } from "../utils/authHelper.js";
import { userSchema } from "../models/userModels.js";
import { AppError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const RegisterService = async (email, password) => {
  try {
    const isEmailExsist = await isExsistingUser(email);
    if (isEmailExsist) {
      console.log(`User Already Exists`);
      throw new AppError(`User Already Exist`, 409);
    }
    const Hashedpassword = await GenPass(password);
    const newUser = await userSchema.create({
      email,
      password: Hashedpassword,
    });
    console.log(`New User Created With Email: ${email}`);
    return newUser;
  } catch (err) {
    console.log(`Error Occured In Register Service: ${err.message}`);
    throw err;
  }
};

const LoginService = async (email, password) => {
  try {
    const User = await isExsistingUser(email);
    if (!User) {
      console.log(`Email does'nt exist`);
      throw new AppError("User With This Email Does'nt Exist", 404);
    }
    const isCorrectPass = await bcrypt.compare(password, User.password);
    if (!isCorrectPass) {
      console.log(`Incorrect Password`);
      throw new AppError("Incorrect password", 401);
    }
    const token = jwt.sign(
      {
        id: User._id,
        email: User.email,
        role: User.role,
      },
      JWT_SECRET,
      { expiresIn: "15m" },
    );
    console.log(`Login Sucessfull`)
    return token;
  } catch (err) {
    console.log(`Error in Login Service: ${err.message}`);
    throw err;
  }
};
export { RegisterService, LoginService };
