// @ts-check
const Product = require('../models/product');

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list.ejs', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            imageSrc: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
        });
    });
}

const getChart = (req, res) => {
    res.render('shop/cart.ejs', {
        pageTitle: 'Cart',
        path: '/cart',
    });
}

const getCheckout = (req, res) => {
    res.render('shop/cart.ejs', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

module.exports = { getProducts, getChart, getCheckout }