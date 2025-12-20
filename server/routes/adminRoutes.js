import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
    getAdminStats,
    jobsByType,
    jobsPerWeek,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);
router.get("/jobs-per-week", authMiddleware, adminMiddleware, jobsPerWeek);
router.get("/jobs-by-type", authMiddleware, adminMiddleware, jobsByType);

export default router;
