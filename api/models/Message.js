const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Chatroom is required!',
    ref: 'Chatroom',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'UserId is required!',
    ref: 'User',
  },
  name: {
    type: String,
    required: 'Name is required!',
    ref: 'Name',
  },
  message: {
    type: String,
    required: 'Message is required!',
  },
});

module.exports = mongoose.model('Message', messageSchema);
