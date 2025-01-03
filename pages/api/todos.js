import connectDB from "../../utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "../../models/User";
import { sortTodos } from "../../helper/helper";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  if (req.method === "POST") {
    try {
      const { title, status } = req.body;

      if (!title || !status) {
        return res
          .status(422)
          .json({ status: "failed", message: "Invalid data!" });
      }

      const result = await User.findOneAndUpdate(
        { email: session.user.email },
        { $push: { todos: { title, status } } },
        { new: true }
      );

      if (!result) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found!" });
      }

      return res.status(201).json({ 
        status: "success", 
        message: "Todo created!",
        data: result.todos[result.todos.length - 1]
      });

    } catch (error) {
      console.error("Error in POST /api/todos:", error);
      return res
        .status(500)
        .json({ status: "failed", message: "Server error while creating todo" });
    }
  } else if (req.method === "GET") {
    const user = await User.findOne({ email: session.user.email });
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({ status: 200});
  }
  else if (req.method === "DELETE"){
    
  }
}

export default handler;