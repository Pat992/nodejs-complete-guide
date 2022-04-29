// @ts-check
const Product = require('../models/product');

const postProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

const getProduct = (req, res) => {
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
    });
}

module.exports = { getProduct, postProduct }