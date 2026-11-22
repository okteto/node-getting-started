const os = require('node:os');
const path = require('node:path');
const express = require('express');

// The message under the logo. Change it and save the file to see hot reload.
const MESSAGE = 'Built, deployed, and tested on Kubernetes.';

const PORT = 3000;

const app = express();

// The page with the Okteto logo.
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// The message, the Node.js version, and the pod that answers.
app.get('/api/info', function (req, res) {
  const pod = os.hostname();
  res.json({
    message: MESSAGE,
    runtime: `Node.js ${process.versions.node}`,
    pod,
  });
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.log('Started hello-world server on %d', PORT);
  });
}

module.exports = { app, MESSAGE };
