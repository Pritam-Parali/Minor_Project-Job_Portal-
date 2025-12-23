import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // ❌ block applying to own job
        if (job.createdBy && job.createdBy.toString() === userId) {
            return res
                .status(400)
                .json({ message: "You cannot apply to your own job" });
        }


        // ❌ prevent double apply
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId,
        });
        if (alreadyApplied) {
            return res.status(400).json({ message: "Already applied" });
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            qualification: req.body.qualification,
            cv: req.file.path,
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        res.status(500).json({ message: "Apply job failed" });
    }
};
// GET MY APPLIED JOBS (USER SIDE)
export const getMyApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await Application.find({
            applicant: userId,
        })
            .populate("job")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch applied jobs" });
    }
};
// GET APPLICANTS FOR A JOB (RECRUITER SIDE)
export const getApplicantsByJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await Application.find({ job: jobId })
            .populate("applicant", "username email phone")
            .sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch applicants" });
    }
};
