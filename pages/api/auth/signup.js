import { hashPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "failed", message: "Method not allowed" });
  }

  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      throw new Error("Failed to connect to database");
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid input - please enter email and password" });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(422)
        .json({ status: "failed", message: "User already exists!" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ status: 201, message: "User created successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ 
      status: "failed", 
      message: "Error creating user. Please try again later.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default handler;
