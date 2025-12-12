// backend/controllers/verifyLoginOtp.js
import Register from "../models/register.js";
import { hashOtp } from "../utils/otp.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Missing email or otp" });

        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.otp || !user.otpExpires) return res.status(400).json({ message: "OTP not found. Request new OTP." });

        if (Date.now() > user.otpExpires) return res.status(400).json({ message: "OTP expired. Request new OTP." });

        const otpHash = hashOtp(otp);
        if (otpHash !== user.otp) return res.status(400).json({ message: "Invalid OTP" });

        // create token
        const payload = {
            id: user._id,
            username: user.username || user.email,
            email: user.email,
            userType: user.userType || "User",
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // clear otp
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.json({ message: "Login successful", token, user: payload });
    } catch (err) {
        console.error("verifyLoginOtp error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
