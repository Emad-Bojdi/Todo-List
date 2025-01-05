import mongoose, { model, Schema , models } from "mongoose";

const todoUserSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    name:String,
    lastName:String,
    todos:[{
        title:String,
        status:String,
    }],
    createdAt:{
        type:Date,
        default:() => Date.now(),
        immutable:true
    }
})

const User =models.User ||  model("User",todoUserSchema);


export default User