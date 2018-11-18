/* global io window jQuery navigator alert moment Mustache */
const socket = io();

function scrollToBottom() {
  // selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  // heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const prevMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function onConnect() {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function joinFailed(err) {
    if (err) {
      console.error(err);
      alert(err);
      window.location.href = '/';
    } else {
      console.log('all good');
    }
  });
});

socket.on('disconnect', function onDisconnect() {
  console.log('Disconnected from server.');
});

socket.on('updateUserList', (users) => {
  console.log('users list', users);
  const ol = jQuery('<ol></ol>');
  users.forEach(function addListItem(user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function onNewMessage(message) {
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function newLocMessage(message) {
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  jQuery('#messages').append(html);
  scrollToBottom();
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
