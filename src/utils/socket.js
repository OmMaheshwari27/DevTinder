const { Server } = require("socket.io");
const Message = require("../models/message");
const { findOrCreateChat } = require("../controllers/chatController");

let io;
const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://dev-tinder-f-three.vercel.app"
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    socket.on("joinChat", ({ chatId }) => {
      socket.join(chatId);
      socket.chatId = chatId;
    });

    socket.on("sendMsg", async ({ chatId, from, to, text }) => {
      try {
        const message = await Message.create({
          chatId: chatId,
          senderId: from,
          receiverId: to,
          text,
        });

        io.to(chatId).emit("msgReceived", message);

      } catch (err) {
        console.log("Error processing message:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = { initializeSocket, io };