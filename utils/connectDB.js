import mongoose from "mongoose";

async function connectDB() {
    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connection successful");
    } catch (err) {
        console.log("connection failed!");
        
    }
}
export default connectDB;