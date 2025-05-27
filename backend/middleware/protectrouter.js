import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.models.js'

dotenv.config()

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user to request
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    console.error('Error in protect middleware:', error)
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

export default protect
