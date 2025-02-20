import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import crypto from "crypto";
import razorpay from "razorpay";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";


//global variable
const currency = "inr";
const deliveryCharge = 100;

//razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded": "Missing");

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
    console.log('order placing start ')
    const { items, amount, address, sessionId } = req.body;
    const userId = req.body.userId || sessionId;

    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded": "Missing");

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
          .json({ success: false, error, message: "Some Error in razorpay, Try Again!" });
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
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserId = async (req, res) => {
  try {
    console.log('req.body ', req.body.userId)
    const { userId } = req.body.userId;
    const { sessionId } = req.body;

    console.log('user-id ', userId)
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



const exportOrders = async (req, res) => {
  try {
    // Get today's start and end timestamps
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch only today's orders
    const orders = await orderModel.find({
      date: { $gte: startOfDay.getTime(), $lte: endOfDay.getTime() }
    }).lean();

    if (!orders.length) {
      return res.status(400).json({ success: false, message: "No orders found for today" });
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Today's Orders");

    // Define columns
    worksheet.columns = [
      { header: "Order ID", key: "_id", width: 30 },
      { header: "User ID", key: "userId", width: 30 },
      { header: "Amount (INR)", key: "amount", width: 15 },
      { header: "Payment Method", key: "paymentMethod", width: 20 },
      { header: "Payment Status", key: "payment", width: 15 },
      { header: "Date", key: "date", width: 25 },
      { header: "Address", key: "address", width: 50 },
      { header: "Items", key: "items", width: 70 },
    ];

    // Add order data with formatted items
    orders.forEach((order) => {
      const formattedItems = order.items
        .map(
          (item) =>
            `Name: ${item.name}, Size: ${item.size}, Qty: ${item.quantity}, Price: ₹${item.price}`
        )
        .join("\n");

      worksheet.addRow({
        _id: order._id.toString(),
        userId: order.userId.toString(),
        amount: `₹${order.amount}`,
        paymentMethod: order.paymentMethod,
        payment: order.payment ? "Paid" : "Pending",
        date: new Date(order.date).toLocaleString(),
        address: order.address,
        items: formattedItems,
      }).height = 30; // Increase row height for better visibility
    });

    // Adjust alignment
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
      });
    });

    // Generate filename with date
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}${currentDate.toLocaleString("en-us", { month: "short" })}${currentDate.getFullYear().toString().slice(-2)}`;
    const fileName = `orders_${formattedDate}.xlsx`;

    // Save file to a temporary path
    const filePath = path.join(process.cwd(), fileName);
    await workbook.xlsx.writeFile(filePath);

    // Send the file as a response
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ success: false, message: "File download error" });
      }
      // Delete the file after download
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};





export { placeOrder, placeOrderRazorpay, verifyRazorpay, userOrders, updateUserId, exportOrders };
