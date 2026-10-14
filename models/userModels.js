import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true },
);

const userSchema = await mongoose.model("Users", user);

export { userSchema };
