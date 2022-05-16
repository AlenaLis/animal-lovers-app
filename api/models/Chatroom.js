const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required!',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'UserId is required!',
    ref: 'UserId',
  },
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
