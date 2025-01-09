import express from "express";
import { authMiddleware } from "../Middleware/auth.js";
import {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay,
  userOrders,
} from "../Controllers/orderController.js";

const orderRouter = express.Router();
// const conditionalAuthMiddleware = (req, res, next) => {
//   if (req.isAuthenticated) {
//     // If the user is logged in, use authMiddleware
//     return authMiddleware(req, res, next);
//   } else {
//     // If the user is not logged in, skip authMiddleware
//     return next();
//   }
// };

//payment features
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);

// verify payments
orderRouter.post("/verifyrazorpay", authMiddleware, verifyRazorpay);

//user features
orderRouter.get("/userorders", authMiddleware, userOrders);

export default orderRouter;
