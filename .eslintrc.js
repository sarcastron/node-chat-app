module.exports = {
  extends: "airbnb-base",
  rules: {
    "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true } ],
  },
  plugins: [
    "mocha",
  ],
  env: {
    mocha: true
  },
};