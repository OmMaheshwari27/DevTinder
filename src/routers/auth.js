const express = require("express");
const AuthRouter=express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validateUserSignup, validateEmailOnly} = require("../utils/validation");
const User = require("../models/user");
require("dotenv").config({ path: __dirname + "/../../.env" }); 





// data coming in from request sent to the server
AuthRouter.post("/signup", async (request, response) => {
  //check request body
  //console.log(request.body);
  try {
    // validation of data
    validateUserSignup(request);
    //encryption of password with salt rounds
    const {firstName,lastName,email,gender,contactInfo,password,photoUrl,about,skills}=request.body;
    const passHash= await bcrypt.hash(password,10);
    //console.log(passHash);
    //new user object
    const data1 = new User({
      firstName,
      lastName,
      email,
      gender,
      contactInfo,
      password:passHash,
      photoUrl,
      about,
      skills,
    });
    //dating being saved
    const savedUser= await data1.save();
    const token= await jwt.sign({_id:savedUser._id},process.env.JWT_SECRET,{expiresIn:"1d"}); //expires in 1 day
      //console.log(token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      response.cookie("token",token,{expires:expiresAt}); 



    response.json({message: "sign up successful ",data:savedUser});
  }
  catch (err) {
    response.status(400).send("error occured " + err.message);
  }
});

//login api with Credential matching
AuthRouter.post("/login", async (request, response) => {
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
      const token=await jwt.sign({_id:userObject._id},process.env.JWT_SECRET,{expiresIn:"1d"}); //expires in 1 day
      //console.log(token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      response.cookie("token",token,{expires:expiresAt}); 
      response.send(userObject);
    }
    else{
      throw new Error("Invalid Credential\n");
    }
  }
  catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
  }
});

AuthRouter.post("/logout", async (request, response) => {
  try {
    response.cookie("token",null,{
        expires:new Date(Date.now())
    }).send("logout successful");
  }
  catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
  }
});

module.exports=AuthRouter;
