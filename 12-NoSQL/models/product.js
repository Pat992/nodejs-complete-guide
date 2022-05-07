const { ObjectId } = require('mongodb');

// @ts-check
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    };
    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(res => console.log(res))
            .catch(e => console.log(e));
    };
    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => products)
            .catch(e => console.log(e));
    };
    static fetch(prodId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: ObjectId(prodId) })
            .next()
            .then(product => product)
            .catch(e => console.log(e));
    };
};

module.exports = Product;