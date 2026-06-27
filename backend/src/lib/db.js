import mongoose from "mongoose";
 
export async function connectDB() {
    const mongoUri = process.env.MONGO_URI;
    if(!mongoUri){
        console.log("MONGO_URI is Required");
        return;
    }
    try{
        await mongoose.connect(mongoUri);
    }catch(error){
        console.error("MongoDB connection error:", error.message);
    }
}