const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();
const products = [];

router.get('/add-product', (req, res) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.render('add-product.pug', { pageTitle: 'Add Product', path: '/admin/add-product' });
    // res.render('add-product.hbs', {
    //     pageTitle: 'Add Product',
    //     path: '/admin/add-product',
    //     activeProduct: true,
    //     productCSS: true,
    //     formsCSS: true
    // });
    res.render('add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct: true,
        productCSS: true,
        formsCSS: true
    });
});

router.post('/add-product', (req, res) => {
    products.push({ 'title': req.body.title });
    res.redirect('/');
});

module.exports = { router, products };