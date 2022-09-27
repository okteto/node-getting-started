const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('online');
})

app.get('/login', function (req, res) {
  res.send('login ok');
})

app.get('/logout', function (req, res) {
  res.send('logout ok');
})


app.listen(3000, function () {
  console.log('openid started');
})
