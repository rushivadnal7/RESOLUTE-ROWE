import express from "express";
import {
    addToCart,
    updateCart,
    getUserCart,
    calculateCartTotal,
    localStrgToDB,
} from "../Controllers/cartController.js";
import { authMiddleware } from "../Middleware/auth.js";

const cartRouter = express.Router();
    
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/update", authMiddleware, updateCart);
cartRouter.get("/get", authMiddleware, getUserCart);
cartRouter.post("/calculate", calculateCartTotal);
cartRouter.post('/lstrgtodb' , localStrgToDB);

export default cartRouter;