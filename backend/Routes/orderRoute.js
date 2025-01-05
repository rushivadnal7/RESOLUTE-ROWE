import express from "express";
import { authMiddleware } from "../Middleware/auth.js";
import {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay,
  userOrders,
} from "../Controllers/orderController.js";

const orderRouter = express.Router();

//payment features
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);

// verify payments
orderRouter.post("/verifyrazorpay", authMiddleware, verifyRazorpay);

//user features
orderRouter.post("/userorders", authMiddleware, userOrders);

export default orderRouter;
