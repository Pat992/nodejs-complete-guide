// @ts-check
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('order_item', {
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

module.exports = OrderItem;