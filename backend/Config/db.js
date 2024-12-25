import mongoose from 'mongoose'
import "dotenv/config.js"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
            .then(() => console.log('Connected to MongoDB'))    
            .catch((error) => console.log('Error connecting to MongoDB:', error));
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}       