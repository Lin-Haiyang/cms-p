const md5 = require("md5");
const User = require("../../model/User");
module.exports = async (req,res)=>{
    let body = req.body;
    console.log(body);
    //账户名称是否唯一
    let username = body.username;
    let user = await User.findOne({username:username});
    if(user){
    return res.status(400).send({msg:"账户名已存在！"})
    }

    //密码加密 单项数据加密
    let password = body.password;
    // let salt = "789"
    // body.password = md5(password+salt);
    body.password = md5(password+salt);
    //保存用户信息
    let newUser = new User(body);
    await newUser.save()
    //相应结果
    res.send({msg:"保存成功"})
}