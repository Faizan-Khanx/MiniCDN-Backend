import express from "express";
import { GuestCDNUpload, validateFileUpload } from "../middleware/cdnMiddleware.js";
import { GuestCDNController } from "../controllers/cdnController.js";
const router = express.Router();

router.post("/guest-upload", GuestCDNUpload,validateFileUpload, GuestCDNController);

export { router };
