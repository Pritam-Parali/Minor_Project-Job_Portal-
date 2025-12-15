// backend/controllers/registerController.js
import bcrypt from "bcryptjs";
import Register from "../models/register.js";
import { generateOtp, hashOtp } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // generate OTP and store hashed version + expiry
        const otpPlain = generateOtp();
        const otpHash = hashOtp(otpPlain);
        const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        const newUser = new Register({
            username,
            email,
            phone,
            password: hashedPassword,
            otp: otpHash,
            otpExpires: otpExpiry,
            isVerified: false,
        });

        await newUser.save();

        // send OTP email
        try {
            await sendEmail({
                to: email,
                subject: "Your Job Portal verification OTP",
                text: `Your OTP is ${otpPlain}. It will expire in 10 minutes.`,
            });
        } catch (mailErr) {
            console.error("Error sending registration OTP email:", mailErr);
            // do not delete the user — send message to client to request resending OTP
        }

        res.status(201).json({ message: "Registered — OTP sent to email", email });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
