const express = require("express");
const { Auth } = require("../middlewares/auth");
const ConnectionRequests = require("../models/connectRequests");
const UserRouter = express.Router();
module.exports = UserRouter;
const User = require("../models/user");

const user_safe_Data = "firstName lastName age gender photoUrl skills about";



UserRouter.get("/user/requests/recieved", Auth, async (request, response) => {
    try {
        const loggedInUser = request.user;
        // get all the request loggedIn user has recieved
        const AllConnectionRequest = await ConnectionRequests.find(
            {
                toUserId: loggedInUser._id,
                status: "interested"
            }
        ).populate("fromUserId", user_safe_Data);
        // if no request is sent to the loginned user by others
        if (AllConnectionRequest.length === 0) {
            return response.status(200).json({
                message: "No request for now",
                data: [],
            });
        }
        //print all the request found
        response.json({
            message: "data fetched successfully",
            data: AllConnectionRequest,
        })
    }
    catch (err) {
        response.status(400).send("Some Error Occured :" + err.message);
    }
});

UserRouter.get("/user/connections", Auth, async (request, response) => {
    try {
        const loggedInUser = request.user;
        const Connections = await ConnectionRequests.find(
            {
                //or condition
                $or: [
                    { toUserId: loggedInUser._id, status: "accepted" },
                    { fromUserId: loggedInUser._id, status: "accepted" },
                ]
            }
        ).populate("fromUserId", user_safe_Data).populate("toUserId", user_safe_Data);
        console.log(Connections);
        
        const data = Connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            else return row.fromUserId;
        })
        response.json({
            message: "data fetched successfully",
            data,
        })
    }
    catch (err) {
        response.status(400).send("Error Occurred while loading");
    }
});




UserRouter.get("/feed", Auth, async (request, response) => {
    let limit = parseInt(request.query.limit) || 10;
    const page = parseInt(request.query.page) || 1;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    try {
        const loggedInUser = request.user;
        console.log(loggedInUser);

        const ConnectionRequest = await ConnectionRequests.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ]
        });

        const hideUser = new Set();
        hideUser.add(loggedInUser._id.toString());

        ConnectionRequest.forEach((req) => {
            hideUser.add(req.fromUserId.toString());
            hideUser.add(req.toUserId.toString());
        });

        //console.log("Exclude Users:", Array.from(hideUser)); // debug

        const users = await User.find({
            _id: { $nin: Array.from(hideUser) }
        })
            .select(user_safe_Data)
            .skip(skip)
            .limit(limit);

        return response.status(200).json(users);

        //return response.status(200).json(ConnectionRequests);
    } catch (err) {
        response.status(400).json({
            success: false,
            message: "Error fetching feed",
            error: err.message,
        });
    }
});
