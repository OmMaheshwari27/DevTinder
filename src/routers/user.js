const express=require("express");
const { Auth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequests");
const UserRouter=express.Router();
module.exports=UserRouter;


UserRouter.get("/user/requests/recieved",Auth,(request,response)=>{
    try{
        const loggedInUser=request.user;
        const ConnectionRequests=ConnectionRequest.find(
            {
                toUserId:loggedInUser._id,
                status:"interested"}
        ).populate("fromUserId","firstName lastName");

        response.json({
            message:"data fetched successfully",
            data:ConnectionRequests,
        })
    }
    catch(err){
        response.status(400).send("Some Error Occured :"+err.message);
    }
});

UserRouter.get("/user/connections",Auth,(request,response)=>{
    try{
        const loggedInUser=request.user;
        const ConnectionRequests=ConnectionRequest.find(
            {
                //or condition
                $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                    {fromUserId:loggedInUser._id , status:"accepted"},
                ]
            }
        ).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");

        const data=ConnectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            else return row.fromUserId;
        })
        response.json({
            message:"data fetched successfully",
            data,
        })
    }
    catch(err){
        response.status(400).send("Error Occurred while loading");
    }

});