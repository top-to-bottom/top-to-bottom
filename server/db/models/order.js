const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATEONLY
  },
  isRegister: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  cookieInfo: {
    type: Sequelize.TEXT //We will need to review this one we have the sessions
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['created', 'processing', 'cancelled', 'completed']]
    }
  },
  submitted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Order
