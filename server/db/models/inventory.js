const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {
  size: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Inventory
