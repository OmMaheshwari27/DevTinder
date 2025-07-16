const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    index:true,
    ref:"User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    index:true,
    ref:"User",
    required: true,
  },
  status: {
    type: String,
    enum: {
        values:["interested", "ignored", "accepted", "pending"],
        message:`{VALUE} is incorret status type`
    },
    required: true,
  }
}, {
  timestamps: true
});
// Compound index: fromUserId + toUserId should be unique
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
// Pre-save hook to prevent self-request
connectionRequestSchema.pre("save", function (next) {
  if (this.fromUserId.toString() === this.toUserId.toString()) {
    return next(new Error("User cannot send connection request to themselves"));
  }
  next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;