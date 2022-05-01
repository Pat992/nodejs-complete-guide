// @ts-check
const Product = require('../models/product');

const getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/index.ejs', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list.ejs', {
            prods: products,
            pageTitle: 'Products',
            path: '/products',
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
    res.render('shop/checkout.ejs', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}

const getOrders = (req, res) => {
    res.render('shop/orders.ejs', {
        pageTitle: 'Your Orders',
        path: '/orders',
    });
};

const getProductDetails = (req, res) => {
    const prodId = req.params.prodId;
    Product.fetch(prodId, product => {
        res.render('shop/product-details.ejs', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    });
};

module.exports = { getProducts, getChart, getCheckout, getIndex, getOrders, getProductDetails }