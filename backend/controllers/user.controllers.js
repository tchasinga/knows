import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Function to signup a new user
export const signup = async (req, res) => {
    try {
        const { name, email, password, profilepic, gender } = req.body;

        // Validate required fields
        if (!name || !email || !password || !gender) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required (name, email, password, gender)" 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ 
                success: false,
                message: "Error hashing password" 
            });
        }

        // Generate profile picture URL based on gender if not provided
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
        
        const profilePicture = profilepic || 
            (gender.toLowerCase() === "male" ? boyProfilePic : girlProfilePic);

        // Create a new user
        const newUser = new User({
            profilepic: profilePicture,
            name,
            email,
            password: hashedPassword,
            gender: gender.toLowerCase()
        });

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",            
        });

        // Add token to user object before saving
        newUser.token = token;

        // Save the user to the database
        await newUser.save();

        // Omit sensitive information from response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilepic: newUser.profilepic,
            gender: newUser.gender,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };

        res.status(201).json({ 
            success: true,
            token, 
            user: userResponse,
            message: "User created successfully"
        });
    } catch (error) {
        console.error("Error during signup:", error);
        
        // Handle specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        
        res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};