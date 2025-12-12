// backend/controllers/loginController.js
import bcrypt from "bcryptjs";
import Register from "../models/register.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const loginSendOtp = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        if (!user.isVerified) return res.status(400).json({ message: "Account not verified. Complete registration OTP." });

        // generate login OTP and save
        const otpPlain = generateOtp();
        const otpHash = hashOtp(otpPlain);
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = otpHash;
        user.otpExpires = otpExpiry;
        await user.save();

        // send OTP
        try {
            await sendEmail({
                to: email,
                subject: "Your Login OTP for Job Portal",
                text: `Your login OTP is ${otpPlain}. It expires in 10 minutes.`,
            });
        } catch (mailErr) {
            console.error("Error sending login OTP email:", mailErr);
        }

        return res.json({ message: "OTP sent to email" });
    } catch (err) {
        console.error("loginSendOtp error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
