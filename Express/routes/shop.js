const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(adminData.products);
    // use path.jon and __dirname to build path (don't use slashes, linux/windows)
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;