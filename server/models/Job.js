import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // 🔗 WHO POSTED THE JOB (IMPORTANT)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    // 🔓 JOB STATUS
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    // ===== YOUR EXISTING FIELDS (UNCHANGED) =====
    firstName: String,
    lastName: String,
    email: String,
    city: String,
    state: String,
    zip: String,
    domain: String,
    companyName: String,
    jobLocation: String,
    salary: Number,
    jobType: String,
    experienceLevel: String,
    qualifications: String,
    skills: String,
    description: String,
    applicationDeadline: Date,
    startDate: Date,
    workHours: String,
    remoteOption: String,
    companyWebsite: String,
    contactNumber: String,
    jobFile: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
