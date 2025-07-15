const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateUserSignup, validateEmailOnly} = require("./utils/validation"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {Auth}=require("./middlewares/auth");


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

// data coming in from request sent to the server
app.post("/signup", async (request, response) => {
  //check request body
  //console.log(request.body);
  try {
    // validation of data
    validateUserSignup(request);
    //encryption of password with salt rounds
    const {firstName,lastName,email,gender,contactInfo,password}=request.body;
    const passHash= await bcrypt.hash(password,10);
    console.log(passHash);
    //new user object
    const data1 = new User({
      firstName,
      lastName,
      email,
      gender,
      contactInfo,
      password:passHash,
    });
    //dating being saved
    await data1.save();
    response.send("db updated");
  }
  catch (err) {
    response.status(400).send("error occured" + err.message);
  }
});

//login api with Credential matching
app.post("/login", async (request, response) => {
  try {
    const {email,password}=request.body;
    // validation of email at api level
    validateEmailOnly(email);
    // fetching user details from the bd using find one method
    const userObject= await User.findOne({email:email});
    // check is user is found or not
    if(!userObject){
      //user not present in db
      throw new Error("Invalid Credential\n");
    }
   //console.log(userObject);
    // comparing stored passwordHASH with entered password in request 
    const password_bool=await bcrypt.compare(password,userObject.password);
    if(password_bool){
    //creating cookie containing jwt token  which will be sent back to cleint browser
      const token=await jwt.sign({_id:userObject._id},"Xoq66937",{expiresIn:"1h"}); //expires in 1 hour
      console.log(token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      response.cookie("token",token,{expires:expiresAt}); 
      response.send("Login Successfully\n");
    }
    else{
      throw new Error("Invalid Credentials\n");
    }
  }
  catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
  }
});

//accessing the profile by verifying the jwt token
app.get("/profile", Auth, async (request,response)=>{
  try{
      const user_Data=request.user;
      response.send(user_Data);
    }
catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
};
});

// Manually added data/ hard coded
app.post("/signup", async (request, response) => {
  const data1 = new User({
    firstName: "Om",
    lastName: "Maheshwari",
    email: "om12@gmail.com",
    gender: "male",
    age: 20,
    contactInfo: 93592359023,
    password: "abc@123",
  });
  try {
    await data1.save();
    response.send("db updated");
  }
  catch (err) {
    response.status(400).send("error occured" + err.message);
  }
});

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