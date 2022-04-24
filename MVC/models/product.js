// @ts-check
const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');
const p = path.join(rootPath, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return callback([]);
        }
        return callback(JSON.parse(data.toString()));
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), () => { });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}