const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");


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

// data coming in from request sent to the server
app.post("/signup", async (request, response) => {
  console.log(request.body);
  //new user object
  const data1 = new User(request.body);
  try {
    //dating being saved
    await data1.save();
    response.send("db updated");
  }
  catch (err) {
    response.status(400).send("error occured" + err.message);
  }
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
app.get("/feed", async (req, res) => {
  // specific target data object
  const Name = req.body.firstName;
  try {
    const userData = await User.find({ firstName: Name });

    if (userData.length == 0) {
      res.status(404).send("user not found");
    }
    else {
      res.send(userData);
      res.send("user found successfully");
    }

  }
  catch (err) {
    res.status(400).send("user not found/something went wrong" + err.message);
  }
})

//delete request
app.delete("/delete", async (req,res)=>{
  // user to be deleted on request
  const byname=req.body.firstName;
  try{
    const deleteduser= await User.deleteOne({firstName:byname});
    if(deleteduser.deletedCount!=0){
      res.send("deleted user was\n");
    }
    else{
      res.status(404).send("user not found");
    }
  }
  catch(err){
      res.status(400).send("user not found/something went wrong " + err.message);
  }
});
// update partial data
app.patch("/update", async (req, res) => {
  const { firstName, ...updateFields } = req.body;

  try {
    const result = await User.updateOne(
      { firstName: firstName },   // filter
      { $set: updateFields }      // update only provided fields
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("❌ User not found.");
    }

    return res.send("✅ User updated successfully.");
  } catch (err) {
    return res.status(400).send("❌ Update failed: " + err.message);
  }
});