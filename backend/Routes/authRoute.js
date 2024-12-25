import express from "express";
import { checkLoginStatus } from "../Controllers/authcontroller.js";
import { authMiddleware } from "../Middleware/auth.js";

const authRouter = express.Router(); 

// Route for checking login status
authRouter.get("/status", authMiddleware , checkLoginStatus);    

export default authRouter;
