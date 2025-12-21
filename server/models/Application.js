import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Register",
            required: true,
        },

        // Apply form fields
        name: String,
        address: String,
        email: String,
        phone: String,
        qualification: String,
        cv: String, // uploaded file path

        status: {
            type: String,
            enum: ["applied", "shortlisted", "rejected"],
            default: "applied",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
