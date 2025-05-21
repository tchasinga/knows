import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

const linksToMogoDbUrl = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected successfully to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
    }
};

export default linksToMogoDbUrl