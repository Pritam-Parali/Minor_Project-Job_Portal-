// backend/controllers/verifyRegisterOtp.js
import Register from "../models/register.js";
import { hashOtp } from "../utils/otp.js";

export const verifyRegisterOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: "Missing email or otp" });

        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.isVerified) return res.status(400).json({ message: "User already verified" });

        if (!user.otp || !user.otpExpires) return res.status(400).json({ message: "OTP not found. Please request new OTP." });

        if (Date.now() > user.otpExpires) return res.status(400).json({ message: "OTP expired. Please request new OTP." });

        const otpHash = hashOtp(otp);
        if (otpHash !== user.otp) return res.status(400).json({ message: "Invalid OTP" });

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.json({ message: "Account verified. Please login." });
    } catch (err) {
        console.error("verifyRegisterOtp error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
