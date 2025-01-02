export const isAdmin = (req, res, next) => {
    // const token = req.cookies?.token;
    // console.log('Token received:', token);
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access only' });
    }
    next();
};


    
