import express from "express";
import { getUserProfile, updateEmail, uploadProfilePic } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// ✅ Profile picture upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Routes
router.get("/me", verifyToken, getUserProfile);
router.put("/update-email", verifyToken, updateEmail);
router.post("/upload-profile-pic", verifyToken, upload.single("profilePic"), uploadProfilePic);

export default router;