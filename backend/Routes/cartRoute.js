import express from "express";
import {
    addToCart,
    updateCart,
    getUserCart,
} from "../Controllers/cartController.js";
import { authMiddleware } from "../Middleware/auth.js";

const cartRouter = express.Router();
    
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/update", authMiddleware, updateCart);
cartRouter.get("/get", authMiddleware, getUserCart);

export default cartRouter;