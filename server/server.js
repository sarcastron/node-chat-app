
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage(
    'Admin',
    'Hey welcome there bud!',
  ));

  socket.broadcast.emit('newMessage', generateMessage(
    'Admin',
    'New user joined',
  ));

  socket.on('createMessage', (message, callback) => {
    console.log('Message Received', message);
    const { from, text } = message;
    io.emit('newMessage', generateMessage(from, text));
    callback({ success: true });
  });

  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    // io.emit('newMessage', generateMessage('Admin', `${latitude}, ${longitude}`));
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'User left'));
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Okay! Listening on port ${port}`);
});
