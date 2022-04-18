const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    // use path.jon and __dirname to build path (don't use slashes, linux/windows)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // If app uses a view-engine, use res.render
    res.render('shop.pug', { prods: adminData.products, docTitle: 'Shop' });
});

module.exports = router;