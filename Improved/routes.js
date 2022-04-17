const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;

    if (url === '/') {
        // Set response
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Input</title></head>');
        res.write(`
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>`);
        res.write('</html>');
        // End and send response -> "return" is required to end function, else nothing else can be set in res
        return res.end();
    } else if (url === '/message' && req.method === 'POST') {
        const body = [];
        // register request data event listener -> each chunk will execute on every data event
        req.on('data', (chunk) => {
            // add chunks into body element
            body.push(chunk);
        });
        // add listener to execute on end
        req.on('end', () => {
            // buffer the chunks -> funny sentence
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // Write new file
            fs.writeFile('message.txt', message, (err) => {
                // redirect user back to /
                res.writeHead(302, {
                    'Location': '/'
                });
                // End and send response (always add return, as mentioned above)
                return res.end();
            });
        });
    }
}

module.exports = { requestHandler };