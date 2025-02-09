import express from "express";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import authRouter from "./Routes/authRoute.js";
import productRouter from "./Routes/ProductRoute.js";
import connectCloudinary from "./Config/cloudinary.js";
import designRouter from "./Routes/designRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import adminAuthRouter from "./Routes/adminRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import otpRouter from "./Routes/otpRoute.js"; 
import cache from "./Config/cache.js"; 
import delhiveryRoutes from './Routes/delhiveryRoute.js'

const app = express();
const port = process.env.PORT || 7007;

// Set Cache (Replaces Redis)
app.get("/set-cache", (req, res) => {
  try {
    cache.set("key", "Hello from Node-Cache!");
    res.send("✅ Data cached successfully!");
  } catch (err) {
    res.status(500).send("❌ Error caching data");
  }
});

// Get Cache (Replaces Redis)
app.get("/get-cache", (req, res) => {
  try {
    const value = cache.get("key");
    res.send(value || "No data in Cache");
  } catch (err) {
    res.status(500).send("❌ Error retrieving data from Cache");
  }
});

// App Config
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
connectDb();
connectCloudinary();

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/product", productRouter);
app.use("/api/designs", designRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/otp", otpRouter);
app.use("/api/delhivery", delhiveryRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend is live :) siuuu");
});

// Start Server
app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
