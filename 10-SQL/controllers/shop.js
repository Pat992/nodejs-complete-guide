// @ts-check
const Product = require('../models/product');
const Cart = require('../models/cart');

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

const getCart = (req, res) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProds = [];
            for (const product of products) {
                const cartProdData = cart.products.find(prod => prod.id === product.id);
                if (cartProdData) {
                    cartProds.push({ prodData: product, quantity: cartProdData.quantity });
                }
            }
            res.render('shop/cart.ejs', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProds
            });
        });
    });
};

const postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.fetch(prodId, (product) => {
        Cart.addProduct(product.id, product.price);
    });
    res.redirect('/cart');
};

const deleteCart = (req, res) => {
    Cart.removeProduct(req.body.prodId, req.body.prodPrice);
    res.redirect('/cart');
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
    Product.fetch(prodId, product => {
        res.render('shop/product-details.ejs', {
            pageTitle: product.title,
            path: '/products',
            product: product
        });
    });
};

module.exports = { getProducts, getCart, getCheckout, getIndex, getOrders, getProductDetails, postCart, deleteCart }