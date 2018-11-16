/* global io jQuery, navigator, alert */
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

socket.on('newLocationMessage', function newLocMessage(message) {
  console.log(message);
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_BLANK">My Current Location</a>');
  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function onFormSubmit(event) {
  event.preventDefault();
  const messageInput = jQuery('input[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageInput.val(),
  }, function createMessageCallback() {
    messageInput.val('');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function onLocation() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by this browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function geolocateSuccess(position) {
      console.log(position.coords);
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function geolocateFail() {
      alert('Unable to fetch location');
      locationButton.removeAttr('disabled').text('Send location');
    },
  );

  return undefined;
});
