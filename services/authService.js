import { isExsistingUser } from "../utils/authHelper.js";
import { GenPass } from "../utils/authHelper.js";
import { userSchema } from "../models/userModels.js";
import { AppError } from "../utils/errorHandler.js";

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

export { RegisterService };
