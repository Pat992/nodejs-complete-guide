// @ts-check
const express = require('express');
const { getProduct, postProduct } = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', getProduct);

router.get('products');

router.post('/add-product', postProduct);

module.exports = { router };