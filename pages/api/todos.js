import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";


async function handler(req, res){

    try {
        await connectDB();
    } catch (error) {
        return res.status(500).json({status: "failed", message: "Failed to connect to database"});
    }
    const session = await getSession({req});
    if(!session){
        return res.status(401).json({status: "failed", message: "Unauthorized"});
    }

    const user = await User.findOne({email: session.user.email});
}