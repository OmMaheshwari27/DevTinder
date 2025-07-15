const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../../.env" }); 

const connectDB = async () => {
  // console.log("ENV Check:", process.env.MONGO_URI); //  Debug line
  return await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;