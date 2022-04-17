const http = require('http');

// const rqListener = (req, res) => { }
// http.createServer(rqListener);

// Create server with request and response callback
const server = http.createServer((req, res) => {
    console.log(req);
    // Set response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Respons</title></head>');
    res.write('<body><h1>Response</h1></body>');
    res.write('</html>');
    // End and send response
    res.end();
});

// Start server-process
server.listen(3000);