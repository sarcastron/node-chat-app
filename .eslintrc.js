module.exports = {
  extends: "airbnb-base",
  rules: {
    "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true } ],
    "no-alert": 'off',
  },
  plugins: [
    "mocha",
  ],
  env: {
    mocha: true
  },
};