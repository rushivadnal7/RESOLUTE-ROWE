import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@gmail.com' && password === 'adminPassword') {
        const adminId = new mongoose.Types.ObjectId();
        const _id = 'adminId';

        const token = jwt.sign(
            { id: adminId.toString() , role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Set cookie with token
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, token : token , message: 'Wel Admin Hello' });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};


const adminLogout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.json({ success: true, message: 'Logged out successfully' });
};



export { adminLogin, adminLogout };