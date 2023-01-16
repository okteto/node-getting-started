const express = require('express');
const app = express();

app.get('/', function (req, res) {
  console.log('Received request');
  res.send('Hello world!');
})

app.listen(3000, function () {
  console.log('Starting hello-world server...');
})
