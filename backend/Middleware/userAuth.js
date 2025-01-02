import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(200).json({ success: false, message: 'Invalid or expired token' });
    }
};
