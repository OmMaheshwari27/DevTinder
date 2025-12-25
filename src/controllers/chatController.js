const Chat = require("../models/chat");

const findOrCreateChat = async (userA, userB) => {
  let chat = await Chat.findOne({
    participants: { $all: [userA, userB] },
  });

  if (!chat) {
    chat = await Chat.create({
      participants: [userA, userB],
    });
  }

  return chat;
};

module.exports = { findOrCreateChat };