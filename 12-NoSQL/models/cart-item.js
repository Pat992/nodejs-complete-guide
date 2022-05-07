// @ts-check
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const CartItem = sequelize.define('cart-item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});

module.exports = CartItem;