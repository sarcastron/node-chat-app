/* global io jQuery */
const socket = io();
socket.on('connect', function onConnect() {
  console.log('Connected to server');
});

socket.on('disconnect', function onDisconnect() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function onNewMessage(message) {
  console.log('New message!', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function onFormSubmit(event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('input[name=message]').val(),
  }, function createMessageCallback() {

  });
});
