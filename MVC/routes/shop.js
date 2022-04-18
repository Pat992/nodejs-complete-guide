// @ts-check
const express = require('express');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('shop.ejs', {
        prods: adminData.products,
        pageTitle: 'Shop',
        path: '/',
        imageSrc: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
    });
});

module.exports = router;