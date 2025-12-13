import Job from "../models/Job.js";

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
