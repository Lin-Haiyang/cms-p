const mongoose = require("mongoose")

//创建集合
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"normal",
        enum:["admin","normal"]
    },
    createtime:{
        type:Number,
        required:true,
        default:1
    },
    avatar:{
        type:String,
        default:null
    }
},{versionKey:false})

//创建集合对象
const User = mongoose.model("User",UserSchema,"users")

module.exports = User