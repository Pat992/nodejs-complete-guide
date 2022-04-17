const http = require('http');
const routes = require('./routes');

// const rqListener = (req, res) => { }
// http.createServer(rqListener);

// Create server with request and response callback
const server = http.createServer(routes);

// Start server-process
server.listen(3000);