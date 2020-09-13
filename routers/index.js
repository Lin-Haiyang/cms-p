module.exports = (app)=>{
    //一级路由 
    //用户
    app.use("/users",require("./user"))
}