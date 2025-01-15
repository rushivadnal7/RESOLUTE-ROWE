import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   login,
//   register,
// } from "../Controllers";
import { register, login, logout, checkUserExists } from '../Controllers/userController.js'
import { authMiddleware } from "../Middleware/auth.js";
// import { checkLoginStatus } from "../Middleware/auth.js";

const userRouter = express.Router();
    
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post('/checkuserexists', checkUserExists)

userRouter.post('/admin', authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
})



export default userRouter; 