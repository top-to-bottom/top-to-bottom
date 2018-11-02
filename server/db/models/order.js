const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  isRegister: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  session: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['created', 'processing', 'cancelled', 'completed']]
    }
  }
})

module.exports = Order
