const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader('Content-Type', 'text/html');
  res.write('<html><header><title>My first webpage</title><body>Hello from Nodejs!</body></header></html>');
  res.end();
});

server.listen(3000)