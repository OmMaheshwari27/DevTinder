const express= require("express");
const app=express();
const connectDB = require("./config/database");
const User=require("./models/user");
console.log("Trying to connect...");
connectDB()
  .then(() => {
    console.log("✅ connected successfully....");
    app.listen(3001, () => {
      console.log("🚀 server is running successfully on port 3001");
    });
  })
  .catch((err) => {
    console.log("❌ DB error:", err);
  });

  app.post("/signup", async (request,response)=>{
const data1=new User({
  firstName:"Om",
  LastName:"Maheshwari",
  email:"om12@gmail.com",
  gender:"male",
  age:20,
  contactInfo:93592359023,
  password:"abc@123",
});
try{
await data1.save();
response.send("db updated");
}
catch(err){
  response.status(400).send("error occured"+ err.message);
}
  });

