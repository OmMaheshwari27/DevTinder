const jwt = require("jsonwebtoken");
const User = require("../models/user");

// dummy auths were made in initial days
// const adminauth=(req,res,next)=>{
//     let token="xyz"
//     if(token==="xyz"){
//         console.log("admin is verified here");

//         next();
//     }
//     else{
//         res.status(401).send("error 401 bad request");
//     }
// }
// const userauth=(req,res,next)=>{
//     let token=req.body?.token;
//     if(token=="xyz"){
//         next();
//     }
//     else{
//         res.status(401).send("error 401 bad request");
//     }
// }

// verifying and validation the actual token with help of jwt.JsonWebToken
const Auth = async (request, response, next) => {
    try {
        const cookie = request.cookies;
        const { token } = cookie;
        if (!token) {
            throw new Error("Token not found");
        }
        const userObject = await jwt.verify(token, "Xoq66937");
        const id = userObject._id;
        const user = await User.findById({ _id: id });
        if (!user) {
            throw new Error("user not found");
        }
        else{
            request.user=user;
            next();
        }
    }
    catch(err){
        response.status(400).send("Error : "+err.message);
    }
}

module.exports = {
    Auth
}