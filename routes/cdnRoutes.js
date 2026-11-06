import express from "express";
import { CDNUpload, validateFileUpload } from "../middleware/cdnMiddleware.js";
import { CDNController, userCDNController } from "../controllers/cdnController.js";
import {ratelimit} from "../middleware/rateLimiter.js"
import {isAuthenticatedUser} from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/guest-upload", ratelimit, CDNUpload,validateFileUpload, CDNController);
router.post("/user-upload", ratelimit, isAuthenticatedUser, CDNUpload, validateFileUpload, userCDNController)

export { router };
