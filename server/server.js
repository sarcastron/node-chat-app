
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Hey welcome there bud!',
    createAt: Date.now(),
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createAt: Date.now(),
  });

  socket.on('createMessage', (message) => {
    console.log('Message Received', message);
    const { from, text } = message;
    io.emit('newMessage', {
      from,
      text,
      createdAt: Date.now(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'User left',
      createAt: Date.now(),
    });
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Okay! Listening on port ${port}`);
});
