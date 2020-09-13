 
const User = require("../../model/User");
module.exports = async (req,res)=>{
     const users = await User.find().select("-password");
     res.send(users)
}