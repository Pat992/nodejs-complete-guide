const http = require('http');

// const rqListener = (req, res) => { }
// http.createServer(rqListener);

// Create server with request and response callback
const server = http.createServer((req, res) => {
    console.log(req);
});

// Start server-process
server.listen(3000);