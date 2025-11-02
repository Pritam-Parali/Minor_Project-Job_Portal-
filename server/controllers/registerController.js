import bcrypt from "bcryptjs";
import Register from "../models/register.js";

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
        const newUser = new Register({
            username,
            email,
            phone,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "🎉 User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
