const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.TEXT
  }
})

module.exports = Cart
