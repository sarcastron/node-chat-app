/* global io */
const socket = io();
socket.on('connect', function onConnect() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'ElDerpo',
    text: 'It\'s me!',
  });
});

socket.on('disconnect', function onDisconnect() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function onNewMessage(data) {
  console.log('New message!', data);
});
