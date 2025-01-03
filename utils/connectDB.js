import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return false;
  }
};

export default connectDB;