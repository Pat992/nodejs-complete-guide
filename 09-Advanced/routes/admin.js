// @ts-check
const express = require('express');
const { getProduct, postProduct, getProducts, getEditProduct, postEditProduct, deleteProduct } = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', getProduct);

router.get('/products', getProducts);

router.get('/edit-product/:prodId', getEditProduct);

router.post('/add-product', postProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', deleteProduct);

module.exports = { router };