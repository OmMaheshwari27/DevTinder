const express = require("express");
const Message = require("../models/message");
const { Auth } = require("../middlewares/auth");
const Chat = require("../models/chat")

const router = express.Router();
// return old messages
router.get("/messages/:chatId", Auth,async (req, res) => {
  try {
    
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/getChatId/:targetUserId", Auth, async (req, res) => {
  try {
    //console.log("Chat model:", Chat);
    const userId = req.user._id;   // auth se aata hai
    const { targetUserId } = req.params;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] }
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, targetUserId]
      });
    }

    res.json({ chatId: chat._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;