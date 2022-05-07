// @ts-check
const mongoDb = require('mongodb');

const MongoClient = mongoDb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://phettich:Password1234@127.0.0.1:27017/shop')
        .then(client => {
            _db = client.db();
            callback();
        })
        .catch(e => console.log(e));
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    return undefined;
}

module.exports = { mongoConnect, getDb };