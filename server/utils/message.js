const generateMessage = (from, text) => {
  return { from, text, createAt: Date.now() };
};

module.exports = {
  generateMessage,
};
