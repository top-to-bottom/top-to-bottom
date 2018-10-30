const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      notEmpty: true
    }
  },
  
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate : {
      isEmail: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
 
   
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    
  },
 imageUrl: {
   type: Sequelize.TEXT,
   allowNull: true,
   defaultValue: "'https://banner2.kisspng.com/20180327/ziq/kisspng-computer-icons-user-profile-avatar-profile-5ab9c9868b8c84.1893767815221251905716.jpg'"
 },
 accountActivity: {
   type: Sequelize.BOOLEAN
 },
 creditCard: {
   type: Sequelize.INTEGER,
   allowNull: true,
   validate: {
     isNumeric: true,
     isCreditCard: true 
   }
 }

})

module.exports = User

/**
 * instanceMethods
 */

/**
 * classMethods
 */



/**
 * hooks
 */



