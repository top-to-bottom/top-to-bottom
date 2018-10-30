const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.indiantradebird.in/images/noimage.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product
