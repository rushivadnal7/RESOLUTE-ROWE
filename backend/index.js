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

// app.options("*", cors()); // Handle preflight requests

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

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://resolute-and-rowe-frontend.vercel.app/", // Deployed frontend
  "https://www.resoluteandrowe.com/", // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.options("*", cors());

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});


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
  console.log(`Server Running at dummy http://localhost:${port}`);
});
