const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res) => {
  const {name, userId, chatroomId} = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw new Error('Chatroom name can contain only alphabets.');

  const chatroomExists = await Chatroom.findOne({name});

  if (chatroomExists) throw new Error('Chatroom with that name already exists!');

  const chatroom = new Chatroom({
    name,
    userId,
    chatroomId,
  });

  await chatroom.save();

  res.json({
    message: 'Chatroom created!',
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};

exports.getChatroom = async (req, res) => {
  const chatroom = await Chatroom.find({
    _id: req.params.id,
  });

  res.json(chatroom);
};

module.exports.deleteChatroom = async function (req, res) {
  const chatroom = await Chatroom.remove({
    _id: req.params.id,
  });
  res.json(chatroom);
};
