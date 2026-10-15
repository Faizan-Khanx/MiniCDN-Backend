import express from "express";
import { RegisterController } from "../controllers/authController.js";
import { RegisterMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/auth/register", RegisterMiddleware, RegisterController);

export { router };
