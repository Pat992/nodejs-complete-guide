// @ts-check
const Product = require('../models/product');
const Cart = require('../models/cart');

const getIndex = (req, res) => {
    Product.findAll().then(prods => {
        res.render('shop/index.ejs', {
            prods: prods,
            pageTitle: 'Shop',
            path: '/',
        });
    }).catch(err => console.log(err));

    // Classical mysql2 using [rows, fieldData] -> Rows are the actual items from table
    // Product.fetchAll().then(([rows, fieldData]) => {
    // ...
    // }).catch(e => console.log(e));
}

const getProducts = (req, res) => {
    Product.findAll().then(prods => {
        res.render('shop/index.ejs', {
            prods: prods,
            pageTitle: 'Shop',
            path: '/products',
        });
    }).catch(err => console.log(err));
}

const getCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts()
                .then(prods => {
                    console.log(prods);
                    res.render('shop/cart.ejs', {
                        pageTitle: 'Cart',
                        path: '/cart',
                        products: prods
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

const postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(prods => {
            let product;

            if (prods.length > 0) {
                product = prods[0];
            }

            let newQuantity = 1;

            if (product) {
                const oldQuantity = product['cart-item'].quantity;
                newQuantity += oldQuantity;

                return fetchedCart.addProduct(product, {
                    through: {
                        quantity: newQuantity
                    }
                });
            }
            return Product.findByPk(prodId)
                .then(product => {
                    // Add extra field to cart_item
                    return fetchedCart.addProduct(product, {
                        through: {
                            quantity: newQuantity
                        }
                    });
                })
                .catch(err => console.log(err));
        })
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
};

const deleteCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({ where: { id: req.body.prodId } })
        })
        .then(prods => {
            const prod = prods[0]
            return prod['cart-item'].destroy();
        })
        .then(_ => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

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

    Product.findByPk(prodId).then(prod => {
        res.render('shop/product-details.ejs', {
            // @ts-ignore
            pageTitle: prod.title,
            path: '/products',
            product: prod
        });
    }).catch(err => console.log(err));

    // ALTERNATIVE APPROACH -> Returns an array
    // Product.findAll({ where: { id: prodId } }).then(products => { ...products[0] })
};

module.exports = { getProducts, getCart, getCheckout, getIndex, getOrders, getProductDetails, postCart, deleteCart }