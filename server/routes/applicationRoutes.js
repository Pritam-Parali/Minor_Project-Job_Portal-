import express from "express";
import { applyJob, getMyApplications, getApplicantsByJob} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
    "/apply/:jobId",
    authMiddleware,
    upload.single("cv"),
    applyJob
);
router.get(
    "/my",
    authMiddleware,
    getMyApplications
);
router.get(
    "/job/:jobId",
    authMiddleware,
    getApplicantsByJob
);


export default router;
