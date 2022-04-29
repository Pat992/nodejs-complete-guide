// @ts-check
const express = require('express');
const { getProducts, getChart, getCheckout, getIndex } = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/cart', getChart);

router.get('/checkout', getCheckout);

module.exports = router;