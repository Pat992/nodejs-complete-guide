// @ts-check
const mongoDb = require('mongodb');

const MongoClient = mongoDb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://phettich:Password1234@127.0.0.1:27017')
        .then(client => callback(client))
        .catch(e => console.log(e));
};

module.exports = mongoConnect;