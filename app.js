const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const md5 = require("md5");
//自动判断参数 有参数转化成对象 req.body = 转化后的对象
app.use(bodyParse.urlencoded({extended:false}));

//连接数据库
let connection = mongoose.connect("mongodb://localhost:27017/cms-p",
{useNewUrlParser:true,useUnifiedTopology:true});
connection.then(()=>{
    console.log("数据库连接成功");
})
.catch(()=>{
    console.log("数据库连接失败");
})
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
})

//创建集合对象
const User = mongoose.model("User",UserSchema,"users")

//用户增加
app.post("/users",async (req,res)=>{
    let body = req.body;
    console.log(body);
    //账户名称是否唯一
    let username = body.username;
    let user = await User.findOne({username:username});
    if(user){
        res.status(400).send({msg:"账户名已存在！"})
    }

    //密码加密 单项数据加密
    let password = body.password;
    console.log(password);
    console.log(md5(password));
    body.password = md5(password);
    //保存用户信息
    let newUser = new User(body);
    await newUser.save()
    //相应结果
    res.send({msg:"保存成功"})
})
app.listen(3000,()=>{
    console.log("Serve is running on 3000");
})