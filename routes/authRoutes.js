import express from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/authController.js";
import {
  RegisterMiddleware,
  LoginMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", RegisterMiddleware, RegisterController);
router.post("/auth/login", LoginMiddleware, LoginController);

export { router };
