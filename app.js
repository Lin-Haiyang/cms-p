const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParse = require("body-parser");

//连接数据库
let connection = mongoose.connect("mongodb://localhost:27017/cms-p",
{useNewUrlParser:true,useUnifiedTopology:true});
connection.then(()=>{
    console.log("数据库连接成功");
})
.catch(()=>{
    console.log("数据库连接失败");
})

//自动判断参数 有参数转化成对象 req.body = 转化后的对象
app.use(bodyParse.urlencoded({extended:false}));


require("./routers/index")(app)


app.listen(3000,()=>{
    console.log("Serve is running on 3000");
})