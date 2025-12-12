// backend/routes/loginRoutes.js
import express from "express";
import { loginSendOtp } from "../controllers/loginController.js";
import { verifyLoginOtp } from "../controllers/verifyLoginOtp.js";

const router = express.Router();

router.post("/login", loginSendOtp); // step 1: verify password and send OTP
router.post("/verify-login-otp", verifyLoginOtp); // step 2: verify OTP and get JWT

export default router;
