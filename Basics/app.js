const http = require('http');
const fs = require('fs');

// const rqListener = (req, res) => { }
// http.createServer(rqListener);

// Create server with request and response callback
const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        // Set response
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Input</title></head>');
        res.write(`
        <body>
        <form action="/message" method="POST">
        <input type="text">
        <button type="submit">Send</button>
        </form>
        </body>`);
        res.write('</html>');
        // End and send response -> "return" is required to end function, else nothing else can be set in res
        return res.end();
    } else if (url === '/message' && req.method === 'POST') {
        // Write new file
        fs.writeFileSync('message.txt', 'TEST');
        // redirect user back to /
        res.writeHead(302, {
            'Location': '/'
        });
        // End and send response
        return res.end();
    }
});

// Start server-process
server.listen(3000);