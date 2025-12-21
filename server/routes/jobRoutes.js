import express from "express";
import multer from "multer";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ ADD
import { getAllJobs } from "../controllers/jobController.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= CREATE JOB (FIXED) ================= */
router.post(
  "/",
  authMiddleware,                 // ✅ ADD THIS
  upload.single("jobFile"),
  async (req, res) => {
    try {
      const job = new Job({
        ...req.body,
        jobFile: req.file ? req.file.filename : null,
        createdBy: req.user.id,    // ✅ ADD THIS
      });

      await job.save();
      res.status(201).json(job);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

/* ================= GET ALL JOBS ================= */
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/jobs", getAllJobs);

export default router;
