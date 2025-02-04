import express from "express";
import { sendOTP, verifyOTP } from "../Controllers/otpController.js";

const router = express.Router();

router.post("/send", sendOTP);  // Send OTP
router.post("/verify", verifyOTP); // Verify OTP
    
export default router;
