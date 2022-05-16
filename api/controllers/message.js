const mongoose = require('mongoose');
const Message = mongoose.model('Message');

exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    chatroom: req.params.id,
  });

  res.json(messages);
};
