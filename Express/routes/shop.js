const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    // use path.jon and __dirname to build path (don't use slashes, linux/windows)
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;