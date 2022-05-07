// @ts-check
const { ObjectId } = require('mongodb');
const Product = require('../models/product');

const postProduct = (req, res) => {
    const prod = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl
    );

    prod.save()
        .then(_ => {
            res.render('admin/edit-product.ejs', {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false
            });
        });
}

const getProduct = (req, res) => {

}

const getEditProduct = (req, res) => {
    const editing = req.query.edit;
    if (!editing) {
        res.redirect('/admin/add-product');
    }

    const prodId = req.params.prodId;

    Product.fetch(prodId).then(prod => {
        if (!prod) {
            return res.redirect('/admin/add-product');
        }
        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editing,
            product: prod
        });
    }).catch(err => console.log(err));
}

const getProducts = (req, res) => {

    Product.fetchAll().then(prods => {
        res.render('admin/products.ejs', {
            prods: prods,
            pageTitle: 'Products',
            path: '/admin/products',
        });
    }).catch(err => console.log(err));
}

const postEditProduct = ((req, res) => {
    const prod = new Product(
        req.body.title,
        req.body.price,
        req.body.description,
        req.body.imageUrl,
        new ObjectId(req.body.prodId)
    );

    prod.save()
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
});

const deleteProduct = (req, res) => {
    Product.findByPk(req.body.prodId)
        .then(prod => {
            return prod.destroy()
        })
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err));
};

module.exports = { getProduct, postProduct, getProducts, getEditProduct, postEditProduct, deleteProduct }