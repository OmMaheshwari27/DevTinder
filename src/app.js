const express= require("express");
const app =express();


// app.use("/test",(req,res)=>{
//     res.send("i am test level");
// });
// app.use("/welcome",(req,res)=>{
//     res.send("i am at welcome");
// });
// app.use("/bye",(req,res)=>{
//     res.send("i am at exit level");
// });

app.post("/test",(req,res)=>{
    console.log("post request here")
    res.send("post request successfully done");
})
app.post("/welcome",(req,res)=>{
    console.log("post request here")
    res.send("post request successfully done");
})
app.post("/bye",(req,res)=>{
    console.log("post request here")
    res.send("post request successfully done");
})




// this one is the wild card for any route
// app.use("/",(req,res)=>{
//     res.send("i am server");
// });
app.listen(3000,()=>{
console.log("server is listen succesfully on port 3000");

});