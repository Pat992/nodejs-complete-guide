// @ts-check
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

    // Only get product if the user created it
    req.user.getProducts({ where: { id: prodId } })
        .then(prods => {
            if (!prods) {
                return res.redirect('/admin/add-product');
            }
            res.render('admin/edit-product.ejs', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editing,
                product: prods[0]
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
    Product.findByPk(req.body.prodId).then(prod => {
        if (!prod) {
            return res.redirect('/admin/products');
        }

        prod.update({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.user.id
        });

        return prod.save();
    })
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