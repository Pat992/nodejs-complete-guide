const { ObjectId } = require('mongodb');

// @ts-check
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id ? ObjectId(id) : undefined;
    };

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('products')
                .updateOne({ _id: ObjectId(this._id) }, { $set: this });
        } else {
            dbOp = db.collection('products')
                .insertOne(this);
        }
        return dbOp.then(res => console.log(res))
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

    static delete(prodId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: ObjectId(prodId) })
            .then(product => product)
            .catch(e => console.log(e));
    };
};

module.exports = Product;