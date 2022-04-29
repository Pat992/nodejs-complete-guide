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

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products.ejs', {
            prods: products,
            pageTitle: 'Products',
            path: '/admin/products',
            imageSrc: 'https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png',
        });
    });
}

module.exports = { getProduct, postProduct, getProducts }