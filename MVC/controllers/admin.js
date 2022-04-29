// @ts-check
const Product = require('../models/product');

const postProduct = (req, res) => {
    const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect('/');
}

const getProduct = (req, res) => {
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
}

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products.ejs', {
            prods: products,
            pageTitle: 'Products',
            path: '/admin/products',
        });
    });
}

module.exports = { getProduct, postProduct, getProducts }