const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    gender:{
        type:String,
    },
    age:{
        type:Number,
    },
    contactInfo:{
        type:Number,
    },
    password:{
        type:String,
    }
});
// basically User named class is defined in DB
const User= mongoose.model("User",userSchema)

module.exports = User;