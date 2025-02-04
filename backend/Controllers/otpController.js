import cache from "../Config/cache.js"; // ✅ Replace Redis with node-cache
import nodemailer from "nodemailer";
import crypto from "crypto"; // To generate secure OTP

// Nodemailer Transporter (Configure Email Sending)
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1️⃣ Send OTP via Email
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = crypto.randomInt(100000, 999999).toString();
    console.log("Generated OTP:", otp);

    cache.set(`otp:${email}`, otp, 300); // ✅ Store OTP in cache for 5 minutes

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP", error: error.message });
  }
};

// 2️⃣ Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email & OTP required" });

    const storedOtp = cache.get(`otp:${email}`); // ✅ Get OTP from cache

    if (!storedOtp) return res.status(400).json({ message: "OTP expired or invalid" });
    if (storedOtp !== otp) return res.status(400).json({ message: "Incorrect OTP" });

    cache.del(`otp:${email}`); // ✅ Remove OTP after verification

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying OTP" });
  }
};
