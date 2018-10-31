
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

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Okay! Listening on port ${port}`);
});
