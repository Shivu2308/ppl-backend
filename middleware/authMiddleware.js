import jwt from 'jsonwebtoken';

const JWT_SECRET = "PPL_SECRET_KEY_2026"; // Ise hamesha .env mein rakhein

export const verifyAdmin = (req, res, next) => {
    // Header se token nikalna (Format: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ 
            success: false, 
            message: "Access Denied! Bhai, login karna zaroori hai." 
        });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified; // Admin ki info request mein daal di
        next(); // Sab sahi hai, ab aage badho (Controller par jao)
    } catch (err) {
        res.status(401).json({ 
            success: false, 
            message: "Invalid or Expired Token! Phir se login karein." 
        });
    }
};