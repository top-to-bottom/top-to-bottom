const Sequelize = require('sequelize')
const db = require('../db')
const {Category} = require('./')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER, //cents
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0.0
    }
  },
  defaultImageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://www.indiantradebird.in/images/noimage.jpg'
  },
  secondaryImageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'http://www.indiantradebird.in/images/noimage.jpg'
  }
})

Product.getItemsForCategory = categoryName => {
  const products = Product.findAll({
    include: [
      {model: Category},
      {
        where: {
          name: categoryName
        }
      }
    ]
  })

  return products
}

Product.getItemsByName = name => {
  const foundProducts = Product.findAll({
    where: {
      name: name
    }
  })
  return foundProducts
}

module.exports = Product
