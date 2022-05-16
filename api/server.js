require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on('error', err => {
  console.log('Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!');
});

require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const app = require('./app');
const sockets = [];
const users = [];
const server = app.listen(8000, () => {
  console.log('Server listening on port 8000');
});

const io = require('socket.io')(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const jwt = require('jwt-then');

const Message = mongoose.model('Message');
const User = mongoose.model('User');
const Chatroom = mongoose.model('Chatroom');

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connection', socket => {
  console.log('Connected: ' + socket.userId);

  sockets.push(socket);

  socket.on('disconnect', async () => {
    const user = await User.findOne({_id: socket.userId});
    socket.join(user, socket.userId);
    socket.emit(user, socket.userId);
    console.log('Disconnected: ' + socket.userId);
  });

  socket.on('joinRoom', async (chatroomId, userId) => {
    const user = await User.findOne({_id: socket.userId});
    const room = await Chatroom.findById({_id: chatroomId});

    socket.join(chatroomId, userId);
    io.to(chatroomId).emit('event', {
      name: user.name,
      userId: socket.userId,
    });

    if (room?.userId == userId) {
      io.to(chatroomId).emit('owner', 'Owner joined the room!');
    }

    io.to(chatroomId).emit('allUsers', {
      user: [...users, user.name],
      example: users.push(user?.name),
    });

    io.to(chatroomId).emit('event', {
      name: user.name,
      userId: socket.userId,
    });

    console.log('A user ' + userId + ' joined chatroom: ' + chatroomId);
  });

  socket.on('leaveRoom', ({chatroomId}) => {
    socket.join(chatroomId);
    socket.emit(chatroomId);

    io.to(chatroomId).emit('roomIsDeleted', {
      chatroomId: chatroomId,
      message: `Room ${chatroomId} was deleted by its owner`,
    });
  });

  socket.on('roomIsDeleted', async chatroomId => {
    const room = await Chatroom.findOne({chatroomId: socket.chatroomId});

    socket.in(room?.name).disconnectSockets(true);

    io.to(chatroomId).emit('roomIsDeleted', 'Room was deleted by owner');
    console.log('A user ' + ' left chatroom: ' + chatroomId);
  });

  socket.on('chatroomMessage', async ({chatroomId, message}) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({_id: socket.userId});

      io.to(chatroomId).emit('newMessage', {
        message,
        name: user.name,
        userId: socket.userId,
      });

      new Message({
        chatroom: chatroomId,
        user: socket.userId,
        name: user.name,
        message,
      })
        .save()
        .then(() => {});
    }
  });
});
