// @ts-check
const express = require('express');
const {
    getProducts,
    getCart,
    getCheckout,
    getIndex,
    getOrders,
    getProductDetails,
    postCart,
    deleteCart,
    postOrder
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:prodId', getProductDetails);

router.post('/cart', postCart);

router.get('/cart', getCart);

router.post('/cart-delete-item', deleteCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);

router.post('/create-order', postOrder);

module.exports = router;