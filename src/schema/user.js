import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    age:{
        type:mongoose.Schema.Types.Int32,
        required:true
    }
})


export const User = mongoose.model("User",userSchema);