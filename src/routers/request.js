const express = require("express");
const RequestRouter = express.Router();
const { Auth } = require("../middlewares/auth");
const ConnectionRequests = require("../models/connectRequests");
const User = require("../models/user");
const mongoose = require("mongoose");

RequestRouter.post("/request/send/:status/:toUserId", Auth, async (request, response) => {
    try {
        const fromUserId = request.user._id;
        const toUserId = request.params.toUserId;
        const status = request.params.status;

        const allowStatus = ["interested", "ignored"];
        if (!allowStatus.includes(status)) {
            throw new Error("Bad request! status not matched");
        }

        const existingConnection = await ConnectionRequests.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnection) {
            throw new Error("Connection request already exists");
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("user not found");
        }


        const newRequest = new ConnectionRequests({
            fromUserId,
            toUserId,
            status,
        });

        const data = await newRequest.save();

        response.json({
            data,
            message: "Connection request sent successfully!!"
        });
    } catch (err) {
        response.status(400).json({
            error: err.message,
            message: "Something went wrong"
        });
    }
});


RequestRouter.post("/request/recieved/:status/:requestedId", Auth, async (request, response) => {
    try {
        const loggedInUser = request.user._id;
        const requested = request.params.requestedId;
        const status = request.params.status;

        const allowStatus = ["accepted", "rejected"];
        if (!allowStatus.includes(status)) {
            throw new Error("Bad request! status not matched");
        }

        const foundRequest = await ConnectionRequests.findOne({
            fromUserId: requested,           // 🛠️ Fixed this line
            toUserId: loggedInUser,
            status: "interested",
        });

        if (!foundRequest) {
            throw new Error("request not found");
        }

        foundRequest.status = status;

        const data = await foundRequest.save();

        response.json({
            data,
            message: `Connection request ${status} by you!`,
        });

    } catch (err) {
        response.status(400).json({
            error: err.message,
            message: "Something went wrong"
        });
    }
});

module.exports = RequestRouter;
