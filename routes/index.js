import express from "express";
import { router as authRoutes } from "./authRoutes.js";
import { router as cdnRoutes } from "./cdnRoutes.js";
const router = express.Router();

router.use("/", authRoutes);
router.use("/", cdnRoutes)

export { router };
