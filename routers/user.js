const user = require("express").Router();

//用户增加
user.post("/", require("../controller/user/save"));
//查询所有用户信息
user.get("/", require("../controller/user/find"));
module.exports = user;
