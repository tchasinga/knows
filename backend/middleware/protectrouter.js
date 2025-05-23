import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.models.js';

dotenv.config();

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token
      req.user = await User.findById(decoded._id).select('-password');
      
      // Check if user exists
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return next();
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided
  return res.status(401).json({ message: 'Not authorized, no token' });
};