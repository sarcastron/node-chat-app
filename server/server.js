
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage(
      'Admin',
      'Hey welcome there bud!',
    ));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage(
      'Admin',
      `${params.name} has joined`,
    ));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('Message Received', message);
    const { from, text } = message;
    io.emit('newMessage', generateMessage(from, text));
    callback({ success: true });
  });

  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left`),
      );
    }
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Okay! Listening on port ${port}`);
});
