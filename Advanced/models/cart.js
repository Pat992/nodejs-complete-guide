const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');
const p = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(prodId, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            const existionProdIndex = cart.products.findIndex(prod => prod.id === prodId);
            const existionProd = cart.products[existionProdIndex];
            let updatedProd;
            if (existionProd) {
                updatedProd = { ...existionProd };
                updatedProd.quantity += 1;
                cart.products = [...cart.products];
                cart.products[existionProdIndex] = updatedProd;
            } else {
                updatedProd = {
                    id: prodId,
                    quantity: 1
                };

                cart.products = [...cart.products, updatedProd];
            }

            cart.totalPrice += +prodPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }
}