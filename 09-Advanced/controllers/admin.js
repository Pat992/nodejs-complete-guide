// @ts-check
const Product = require('../models/product');

const postProduct = (req, res) => {
    const product = new Product(
        null,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect('/');
}

const getProduct = (req, res) => {
    res.render('admin/edit-product.ejs', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

const getEditProduct = (req, res) => {
    const editing = req.query.edit;
    if (!editing) {
        res.redirect('/admin/add-product');
    }

    const prodId = req.params.prodId;
    Product.fetch(prodId, (prod) => {
        if (!prod) {
            return res.redirect('/admin/add-product');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editing,
            product: prod
        });
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

const postEditProduct = ((req, res) => {
    const product = new Product(
        req.body.prodId,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect('/');
});

const deleteProduct = (req, res) => {
    Product.delete(req.body.prodId);
    res.redirect('/admin/products');
};

module.exports = { getProduct, postProduct, getProducts, getEditProduct, postEditProduct, deleteProduct }