const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = 3000;

const namespaceFile = "/var/run/secrets/kubernetes.io/serviceaccount/namespace"
const namespace = fs.readFileSync(namespaceFile);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello from the cluster, namespace ${namespace}\n`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});