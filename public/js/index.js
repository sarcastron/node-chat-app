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
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('input[name=message]').val(),
  }, function createMessageCallback() {

  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function onLocation() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by this browser.');
  }

  navigator.geolocation.getCurrentPosition(
    function geolocateSuccess(position) {
      console.log(position.coords);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function geolocateFail() {
      alert('Unable to fetch location');
    },
  );

  return undefined;
});
