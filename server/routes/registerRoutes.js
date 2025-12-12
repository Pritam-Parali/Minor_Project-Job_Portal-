// backend/routes/registerRoutes.js
import express from "express";
import { registerUser } from "../controllers/registerController.js";
import { verifyRegisterOtp } from "../controllers/verifyRegisterOtp.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-register-otp", verifyRegisterOtp);

export default router;
