import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import {sortData} from "../../helper/helper";

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

    if(!user){
        return res.status(404).json({status: "failed", message: "User not found"});
    }

    if(req.method === "POST"){
        const {title, status} = req.body;
        if(!title || !status){
            return res.status(400).json({status: "failed", message: "Title and status are required"});
        }

        user.todos.push({title, status});
        user.save();

        return res.status(201).json({status: "success", message: "Todo created successfully"});
    }

    if(req.method === "GET"){
        const sortedTodos = sortData(user.todos);
        return res.status(200).json({status: "success", data:{todos: sortedTodos}});
    }
    else if(req.method === "PATCH"){
        const {id, status} = req.body;
        if(!id || !status){
            return res.status(422).json({status: "failed", message: "Id and status are required"});
        }
        const result = await User.updateOne({"todos._id": id}, {$set: {"todos.$.status": status}});
        res.status(200).json({status: "success", message: "Todo updated successfully"});
    }
}

export default handler;