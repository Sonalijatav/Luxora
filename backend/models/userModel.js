const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:{},
        required:true
    },
    answer:{
        type: String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }

},{timestamps:true})     //timestamp true krne se jb bhi new user create hoga uska time stamp save ho jayega

module.exports = mongoose.model("users", userSchema);
