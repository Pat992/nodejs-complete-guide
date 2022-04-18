// @ts-check
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.json());
app.get('/', (req, res) => {
    res.end('Working');
});

app.listen(port, () => {
    console.log(`Server started on port port`);
});