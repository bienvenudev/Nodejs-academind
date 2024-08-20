const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html><header><title>Enter Information</title></header><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></html>');
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on('data', (chunk) => {
    console.log(chunk);
    body.push(chunk);
    })
    return req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    fs.writeFile('message.txt', message, (err) => {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();  
    });
  });   
  }
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><header><title>My first webpage</title></header><body><h1>Hello from Nodejs!</h1></body></html>');
  res.end();
}

module.exports = {
  handler: requestHandler,
  someText: 'some hard coded text!',
};