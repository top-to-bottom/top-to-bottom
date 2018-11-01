const Sequelize = require('sequelize')
const db = require('../db')

const OrderData = db.define('orderData', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderData
