const express= require("express");
const app =express();
// app.use("/",(req,res)=>{
//     res.send("i am server");
// });
app.use("/test",(req,res)=>{
    res.send("i am test level");
});
app.listen(3000,()=>{
console.log("server is listen succesfully on port 3000");

});