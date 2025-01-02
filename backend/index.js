import express from "express";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import authRouter from '../backend/Routes/authRoute.js'
import productRouter from "./Routes/ProductRoute.js";
import connectCloudinary from "./Config/cloudinary.js";
import designRouter from "./Routes/designRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import adminAuthRouter from "./Routes/adminRoute.js";

const app = express();
const port = process.env.PORT || 7007;

// app config       
app.use(express.json());
app.use(cookieParser()) 
app.use(cors({
    origin: 'http://localhost:5173', // React app's local URL
    credentials: true, // Allow credentials (cookies, HTTP headers) to be sent
}));
connectDb();    
connectCloudinary();

//API Endpoints
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminAuthRouter);
app.use("/api/product", productRouter);
app.use("/api/designs", designRouter);
app.use("/api/cart", cartRouter);
    

// Home Route
app.get("/", (req, res) => {
    res.send("Backend is live :)siuuu");
});

// port
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});