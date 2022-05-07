// @ts-check
const Product = require('../models/product');

const postProduct = (req, res) => {
    Product.create({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price
    }).then(res => {
    }).catch(err => console.log(err));
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
    Product.fetch(prodId).then(([row, fieldData]) => {
        if (!row) {
            return res.redirect('/admin/add-product');
        }

        res.render('admin/edit-product.ejs', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editing,
            product: row[0]
        });
    }).catch(e => console.log(e));
}

const getProducts = (req, res) => {
    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('admin/products.ejs', {
            prods: rows,
            pageTitle: 'Products',
            path: '/admin/products',
        });
    }).catch(e => console.log(e));
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