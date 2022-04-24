// @ts-check
const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        this.p = path.join(rootPath, 'data', 'products.json');
        fs.readFile(this.p, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data.toString());
            }
            products.push(this);

            fs.writeFile(this.p, JSON.stringify(products), () => { });
        });
    }

    static fetchAll(callback) {
        this.p = path.join(rootPath, 'data', 'products.json');
        fs.readFile(this.p, (err, data) => {
            if (err) {
                callback([]);
            }
            callback(JSON.parse(data.toString()));
        });
    }
}