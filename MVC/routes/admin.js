// @ts-check
const express = require('express');
const { getProduct, postProduct } = require('../controllers/products')

const router = express.Router();

router.get('/add-product', getProduct);

router.post('/add-product', postProduct);

module.exports = { router };