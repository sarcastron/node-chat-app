const generateMessage = (from, text) => ({ from, text, createdAt: Date.now() });

const generateLocationMessage = (from, lat, long) => ({
  from,
  url: `https://google.com/maps?q=${lat},${long}`,
  createdAt: Date.now(),
});

module.exports = {
  generateMessage,
  generateLocationMessage,
};
