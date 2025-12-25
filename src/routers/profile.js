const express = require("express");
const ProfileRouter = express.Router();
const { validateProfileData, validatePassword } = require("../utils/validation");
const { Auth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { isStrongPassword } = require("validator");
const User = require("../models/user");


ProfileRouter.get("/profile/view/:id", Auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName age gender photoUrl about skills"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Error: " + err.message });
  }
});
//accessing the profile by verifying the jwt token
ProfileRouter.get("/profile/view", Auth, async (request, response,) => {
    try {
        //get the user data from the request
        const user_Data = request.user;
        //console.log(user_Data);

        response.send(user_Data);

    }
    catch (err) {
        response.status(400).send("Error Occured : " + err.message);
    };
});

ProfileRouter.patch("/profile/edit", Auth, async (request, response) => {
    try {
        if (!validateProfileData(request)) {
            throw new Error("Edit not allowed");
        }
        const loggedInUser = request.user;
        //console.log(loggedInUser);
        Object.keys(request.body).forEach((key) => (loggedInUser[key] = request.body[key]));
        //console.log(loggedInUser);
        await loggedInUser.save();
        response.send(`${loggedInUser.firstName}'s profile updated successfully`);

    }
    catch (err) {
        response.status(400).send("Error : " + err.message);
    }
});
ProfileRouter.patch("/profile/password", Auth, async (request, response) => {
    try {
        const { password, new_password } = request.body;

        const is_valid = await validatePassword(request);
        if (!is_valid) {
            throw new Error("Enter correct old password");
        }

        if (password === new_password) {
            throw new Error("New password cannot be the same as old password");
        }

        if (!isStrongPassword(new_password)) {
            throw new Error("Password too weak");
        }

        const loggedInUser = request.user;
        const passHash = await bcrypt.hash(new_password, 10);
        loggedInUser.password = passHash;
        await loggedInUser.save();

        response.send(`${loggedInUser.firstName}'s password updated successfully`);
    } catch (err) {
        response.status(400).send("Error : " + err.message);
    }
});
module.exports = ProfileRouter;