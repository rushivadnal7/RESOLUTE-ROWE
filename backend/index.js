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
import delhiveryRoutes from "./Routes/delhiveryRoute.js";
import contactRouter from "./Routes/contactRoute.js";
import productModel from "./Models/productModel.js";

const app = express();
const port = process.env.PORT || 7007;

// App Config
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://www.resoluteandrowe.com", // Deployed frontend
  "https://resoluteandrowe.com", // Deployed frontend
  "https://resolute-rowe.onrender.com", // Deployed frontend
];

// CORS Middleware (with credentials enabled)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Needed for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Fix: Allow credentials in response headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Handle preflight requests for all routes
app.options("*", cors());

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

// Disable Caching
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

// Connect Database & Cloudinary
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
app.use("/api/contact", contactRouter);


// Home Route
app.get("/", (req, res) => {
  res.send("Backend is live :) siuuu");
});

// Add in your index.js or a separate route file
app.get("/product-preview/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have a Product model
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta property="og:title" content="${product.name}" />
        <meta property="og:description" content="${product.description}" />
        <meta property="og:image" content="${product.imageUrl}" />
        <meta property="og:url" content="https://resoluteandrowe.com/products/${product._id}" />
        <meta property="og:type" content="product" />
        <title>${product.name}</title>
      </head>
      <body>
        Redirecting...
        <script>
          window.location.href = "https://resoluteandrowe.com/products/${product._id}";
        </script>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Server Running at dummy http://localhost:${port}`);
});
