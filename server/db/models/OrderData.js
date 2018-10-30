
const Sequelize = require('sequelize')
const db = require('../db')

const OrderData = db.define('orderData', {

    quantity: {
        type: Sequelize.INTEGER
    },
    isOrdered: Sequelize.BOOLEAN


})




module.exports = OrderData