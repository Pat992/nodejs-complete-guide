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
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const exisitingProdIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProds = [...products];
                updatedProds[exisitingProdIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProds), () => { });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), () => { });
            }
        });
    }

    static delete(id) {
        getProductsFromFile((products) => {
            // const deletingProdIndex = products.findIndex(prod => prod.id === id);
            // const updatedProds = [...products];
            // updatedProds.splice(deletingProdIndex, 1);
            const updatedProds = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProds), () => { });
        });

    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static fetch(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}