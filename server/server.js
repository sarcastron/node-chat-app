
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Okay! Listening on port ${port}`);
});
