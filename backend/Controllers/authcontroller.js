import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


export const checkLoginStatus = async (req, res) => {
    const token = req.cookies?.token; // Check cookies
    const isAdmin = req.user.role === 'admin';

    const userId = req.userId;
    const userData = await userModel.findById(userId);

    console.log('Token received:', token);
    if (!token) {
        return res.status(200).json({ loggedIn: false, message: "User is not logged in" });
    }
    if (isAdmin) {
        return res.status(200).json({ adminLoggedin: true, message: "Admin logged in" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ loggedIn: true, user: verified, userData , message : 'user logged in'});
    } catch (err) {
        return res.status(403).json({ loggedIn: false, message: "Invalid token" });
    }
};
