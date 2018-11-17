/* global io jQuery, navigator, alert, moment, Mustache */
const socket = io();
socket.on('connect', function onConnect() {
  console.log('Connected to server');
});

socket.on('disconnect', function onDisconnect() {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function onNewMessage(message) {
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function newLocMessage(message) {
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  jQuery('#messages').append(html);
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
