// backend/config/redisClient.js

import { createClient } from "redis"; // Import createClient from redis
import dotenv from "dotenv"; // Load environment variables

dotenv.config(); // Load environment variables from .env

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379", // Default Redis URL for Docker
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected successfully!");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

// Connect Redis on app start
redisClient.connect();

export default redisClient; // Export the Redis client for reuse in other files
