// @ts-check
const express = require('express');
const { getProduct, postProduct, getProducts } = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', getProduct);

router.get('/products', getProducts);

router.post('/add-product', postProduct);

module.exports = { router };