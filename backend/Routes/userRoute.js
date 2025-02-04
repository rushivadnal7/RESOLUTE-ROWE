import express from "express";
import { register, login, logout, checkUserExists, resetPassword } from '../Controllers/userController.js'
import { authMiddleware } from "../Middleware/auth.js";

const userRouter = express.Router();
    
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post('/checkuserexists', checkUserExists)
userRouter.post('/resetpassword', resetPassword)

userRouter.post('/admin', authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
})



export default userRouter; 