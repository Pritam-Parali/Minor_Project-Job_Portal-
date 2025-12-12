// backend/models/register.js
import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },

        // OTP & verification fields
        otp: { type: String },         // store hashed OTP
        otpExpires: { type: Date },
        isVerified: { type: Boolean, default: false },
        userType: { type: String, default: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Register", registerSchema);
