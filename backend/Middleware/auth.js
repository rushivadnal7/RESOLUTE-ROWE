import jwt from 'jsonwebtoken';
// import userModel from '../Models/userModel.js';  // Your user model

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized access, token not provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Store user ID for further use
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};   

