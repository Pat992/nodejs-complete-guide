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

const getProduct = (req, res) => {
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
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

const postProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

module.exports = { getProduct, getProducts, postProduct, getChart, getCheckout }