const Sequelize = require('sequelize')
const db = require('../db')

const CartData = db.define('cartData', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = CartData
