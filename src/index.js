const express= require("express");
const app=express();
const { adminauth, userauth } = require("./middlewares/auth");

app.use("/admin",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can do anything");
})
app.use("/admin/manageUser",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can ManageUsers");
})
app.use("/admin/UpdateProfile",adminauth,(req,res)=>{
    console.log("user was authorized");
    res.send("now admin can updateProfile");
})

app.use("/user/login",(req,res)=>{
    console.log("user tried to login");
})
app.use("/user/profile",userauth,(req,res)=>{
    console.log("user was verified");
})
app.use("/user/changePassword",userauth,(req,res)=>{
    console.log("user was verified");
});


app.listen(3001,()=>{
console.log("server is listen succesfully on port 3001");

});