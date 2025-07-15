const express = require("express");
const ProfileRouter=express.Router();

const {Auth}=require("../middlewares/auth");

//accessing the profile by verifying the jwt token
ProfileRouter.get("/profile", Auth, async (request,response,)=>{
  try{
      const user_Data=request.user;
      response.send(user_Data);
    }
catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
};
});

module.exports=ProfileRouter;