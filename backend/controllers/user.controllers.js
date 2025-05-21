import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


// Load environment variables from .env file
dotenv.config();


// Function to singup a new user
export const signup = async (req, res) => {
    try {
        const { name, email, password, profilepic, gender } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }

       const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
       const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;



        // Create a new user
        const newUser = new User({
            profilepic: profilepic ? profilepic : (gender === "male" ? boyProfilePic : girlProfilePic),
            name,
            email,
            password: hashedPassword,
            gender,
            token
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",            
        });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};