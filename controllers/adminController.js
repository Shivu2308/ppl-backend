import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

// 1. Admin Login Logic
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Bhai, username aur password dono bharo!" });
    }

    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    // Token creation
    const token = jwt.sign({ id: admin._id }, process.env.JWT_TOKEN, { expiresIn: '24h' });

    res.status(200).json({ 
      success: true, 
      token, 
      message: "Welcome Back, Admin!" 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
