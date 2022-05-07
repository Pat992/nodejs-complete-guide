// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'product-db',
//     password: ''
// });

// module.exports = pool.promise();
// @ts-check
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;