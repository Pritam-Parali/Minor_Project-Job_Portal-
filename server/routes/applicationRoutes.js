import express from "express";
import { applyJob } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
    "/apply/:jobId",
    authMiddleware,
    upload.single("cv"),
    applyJob
);

export default router;
