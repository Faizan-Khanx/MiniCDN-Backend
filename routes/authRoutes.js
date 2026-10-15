import express from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/authController.js";
import {
  RegisterMiddleware,
  LoginMiddleware,
} from "../middleware/authMiddleware.js";
import { ratelimit } from "../middleware/rateLimiter.js";
const router = express.Router();

router.post("/auth/register", ratelimit,  RegisterMiddleware, RegisterController);
router.post("/auth/login", ratelimit, LoginMiddleware, LoginController);

export { router };
