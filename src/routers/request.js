const express = require("express");
const RequestRouter = express.Router();
const { Auth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequests");
const User = require("../models/user");

RequestRouter.post("/request/send/:status/:toUserId", Auth, async (request, response) => {
    try {
        const fromUserId = request.user._id;
        const toUserId = request.params.toUserId;
        const status = request.params.status;

        const allowStatus = ["interested", "ignored"];
        if (!allowStatus.includes(status)) {
            throw new Error("Bad request! status not matched");
        }

        const existingConnection = await ConnectionRequest.findOne({
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


        const requestData = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await requestData.save();

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
module.exports = RequestRouter;
