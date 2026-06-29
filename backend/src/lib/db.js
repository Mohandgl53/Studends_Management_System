import mongoose from "mongoose";

export async function connectDB() {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/students-management";

    if (!process.env.MONGO_URI) {
        console.log("MONGO_URI not set, using default local MongoDB URI");
    }

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 15000
        });
        console.log("MongoDB connected successfully to", mongoUri);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}