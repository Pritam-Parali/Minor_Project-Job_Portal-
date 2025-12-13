import Job from "../models/Job.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      jobFile: req.file ? req.file.filename : null,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Job not saved" });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
