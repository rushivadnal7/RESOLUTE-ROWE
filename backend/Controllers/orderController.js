import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";
import razorpay from "razorpay";


//global variable
const currency = "inr";
const deliveryCharge = 100;

//razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//placing orders using cod method
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, sessionId } = req.body;
    const userId = req.body.userId || sessionId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    if (req.body.userId) {
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
    }

    return res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address, sessionId } = req.body;
    const userId = req.body.userId || sessionId;

    let orderId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id,
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, message: "Some Error, Try Again!" });
      }
      console.log('order ', order)
      console.log('order id', order.id)
      orderId = order.id;
      return res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//verify razorpay
const verifyRazorpay = async (req, res) => {
  const { order_id, payment_id, signature, sessionId, receipt } = req.body;
  const _id = receipt
  const userId = req.body.userId || sessionId;
  console.log('verify razorpay ' + userId)
  const body = order_id + "|" + payment_id;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log(userId)

  try {
    if (generatedSignature === signature) {
      await orderModel.findOneAndUpdate({ _id }, { payment: true });
      if (req.body.userId) {
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
      }

      return res.json({ success: true, message: "Payment successful" });
    } else {
      // await orderModel.findByIdAndDelete(orderInfo.receipt.toString());
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all orders of that particular user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserId = async (req, res) => {
  try {
    console.log('req.body ' ,req.body.userId)
    const { userId } = req.body.userId;  
    const { sessionId } = req.body; 

    console.log('user-id ' , userId)
    console.log('session-id ', sessionId)

    const result = await orderModel.updateMany(
      { userId: sessionId }, 
      { $set: { userId: req.body.userId } } 
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: `${result.modifiedCount} orders updated successfully`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'No matching orders found to update',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




export { placeOrder, placeOrderRazorpay, verifyRazorpay, userOrders , updateUserId };
