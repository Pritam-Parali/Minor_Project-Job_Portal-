import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Register from "../models/register.js";

const router = express.Router();

// GET logged-in user's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await Register.findById(userId)
      .select("-password -otp -otpExpires");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
