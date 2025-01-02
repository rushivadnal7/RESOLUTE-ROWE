import express from "express";
import { checkLoginStatus } from "../Controllers/authcontroller.js";
import { authMiddleware } from "../Middleware/auth.js";
import { userAuth } from "../Middleware/userAuth.js";

const authRouter = express.Router(); 

// Route for checking login status
authRouter.get("/status", userAuth, checkLoginStatus);    

export default authRouter;
