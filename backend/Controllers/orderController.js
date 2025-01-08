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
    const { userId, items, amount, address } = req.body;
    const orderData = {
      orderId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    let orderId;
    const orderData = {
      orderId,
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
  const { order_id, payment_id, signature } = req.body.razorpayData;
  const userId = req.body.userId;

  const body = order_id + "|" + payment_id;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  try {
    if (generatedSignature === signature) {
      await orderModel.findOneAndUpdate({ userId }, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res
        .status(200)
        .json({ success: true, message: "Payment Successful" });
    } else {
      console.log("else");

      return res
        .status(400)
        .json({ success: false, message: "Payment Failed" });
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

export { placeOrder, placeOrderRazorpay, verifyRazorpay, userOrders };
