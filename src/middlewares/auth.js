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
        const { token } = request.cookies;

        if (!token) {
            return response.status(401).send("please login");
        }

        const userObject = await jwt.verify(token, "Xoq66937");
        const id = userObject._id;
        const user = await User.findById({ _id: id });

        if (!user) {
            return response.status(404).send("User not found");
        }

        request.user = user;
        next(); // ✅ Only called if all above passes
    } catch (err) {
        return response.status(400).send("Error: " + err.message); 
}
};

module.exports = {
    Auth
}