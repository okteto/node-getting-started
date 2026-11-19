const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function (req, res) {
  res.send('Hello world!');
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Started hello-world server on %d', PORT);
  });
}

module.exports = app;
