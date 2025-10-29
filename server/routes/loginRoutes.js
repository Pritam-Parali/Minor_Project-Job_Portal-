import express from "express";
import bcrypt from "bcryptjs";
import Register from "../models/register.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Register.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        res.status(200).json({ message: "✅ Login successful" });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
