import express from "express";
import { authMiddleware } from "../Middleware/auth.js";
import {
  placeOrder,
  placeOrderRazorpay,
  verifyRazorpay,
  userOrders,
} from "../Controllers/orderController.js";
import jwt from "jsonwebtoken";


const orderRouter = express.Router();
const orderMiddleware = (req, res, next) => { 
  console.log('order middleware ' ,   req.body)
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } else {
    // If no token, check for sessionId and set as userId
    if (req.body.sessionId) {
      req.body.userId = req.body.sessionId;
      console.log(req.body.userId)
    } else {
      return res.status(401).json({ success: false, message: "User not logged in and no session ID provided" });
    }
  }

  next();
};


//payment features
orderRouter.post("/place", orderMiddleware, placeOrder);
orderRouter.post("/razorpay", orderMiddleware, placeOrderRazorpay);

// verify payments
orderRouter.post("/verifyrazorpay", orderMiddleware, verifyRazorpay);

//user features
orderRouter.get("/userorders", orderMiddleware, userOrders);

export default orderRouter;
