import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import "dotenv/config.js";
import userModel from "../models/userModel.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });


    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email'
      })
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Password should be at least 8 characters long'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = userModel({
      name: name,
      email: email,
      password: hashedPassword,
    })


    const user = await newUser.save();
    const token = generateToken(user._id)


    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      samesite: 'lax',
      maxAge: 60 * 60 * 24 * 30 * 2 * 1000,
    })
    res.json({ success: true, message: 'welcome to Resolute & Rowe', token })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '60d' })
}

export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does'nt exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = generateToken(user._id)

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      samesite: 'lax',
      maxAge: 60 * 60 * 24 * 30 * 2 * 1000,
    })

    res.json({
      success: true,
      message: '🗿welcome back!',
      token
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
  res.json({ success: true, message: 'Logged out successfully' });
};

export const checkUserExists = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: 'User does not exist', exists: false })
  } else {
    return res.json({ success: true, message: 'User exists', exists: true })
  }

}

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;  

  console.log(email , newPassword)
  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Validate new password length
    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};
