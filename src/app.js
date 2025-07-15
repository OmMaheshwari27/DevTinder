const express= require("express");
const app = express();
const connectDB = require("./config/database");

const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");



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
  // it will act as a middleware for all the api request where
  // the data coming in the form of JSON will be convert to JavaScript Object  
app.use(express.json());
app.use(cookieParser());



const AuthRouter=require("./routers/auth");
const ProfileRouter=require("./routers/profile");
const RequestRouter=require("./routers/request");

app.use("/",AuthRouter);
app.use("/",ProfileRouter);
app.use("/",RequestRouter);

  






//get all the user from the database
app.get("/feed", async (request, response) => {
  // specific target data object
  const Name = request.body.firstName;
  try {
    const userData = await User.find({ firstName: Name });

    if (userData.length == 0) {
      response.status(404).send("user not found");
    }
    else {
      response.send(userData);
      response.send("user found successfully");
    }

  }
  catch (err) {
    response.status(400).send("user not found/something went wrong" + err.message);
  }
})

//delete request
app.delete("/delete", async (request,response)=>{
  // user to be deleted on request
  const byname=request.body.firstName;
  try{
    const deleteduser= await User.deleteOne({firstName:byname});
    if(deleteduser.deletedCount!=0){
      response.send("deleted user was\n");
    }
    else{
      response.status(404).send("user not found");
    }
  }
  catch(err){
      response.status(400).send("user not found/something went wrong " + err.message);
  }
});
// update partial data
app.patch("/update", async (request, response) => {
  const { firstName, ...updateFields } = request.body;

  try {
    const result = await User.updateOne(
      { firstName: firstName },   // filter
      { $set: updateFields }      // update only provided fields
    );

    if (result.matchedCount === 0) {
      return response.status(404).send("❌ User not found.");
    }

    return response.send("✅ User updated successfully.");
  } catch (err) {
    return response.status(400).send("❌ Update failed: " + err.message);
  }
});


