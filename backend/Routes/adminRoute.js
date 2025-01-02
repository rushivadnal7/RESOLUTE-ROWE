import express from "express";
import { isAdmin } from "../Middleware/adminAuth.js";
import { authMiddleware } from "../Middleware/auth.js";
import { adminLogin, adminLogout } from "../Controllers/adminController.js";

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', adminLogin);
adminAuthRouter.post('/logout', adminLogout);
adminAuthRouter.get('/validate', authMiddleware, isAdmin, (req, res) => {
    const isAdmin = req.user.role === 'admin';
    res.json({ isAdmin });
}); 


export default adminAuthRouter;             