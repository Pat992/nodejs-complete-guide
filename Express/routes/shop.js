const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    // use path.jon and __dirname to build path (don't use slashes, linux/windows)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    // If app uses a view-engine, use res.render
    // res.render('shop.pug', { prods: adminData.products, pageTitle: 'Shop', path: '/' });
    res.render('shop.hbs', {
        prods: adminData.products,
        pageTitle: 'Shop',
        path: '/',
        imageSrc: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
        hasProducts: adminData.products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;