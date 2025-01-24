import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token' , token )
  if (!token) {
    return res
    .status(401)
      .json({
        success: false,
        message: "Unauthorized access, token not provided",
      });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id;
    req.body.userId = decoded.id;
    console.log('req.body.userId' , req.body.userId )
    console.log('req.userId' , req.userId )
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
