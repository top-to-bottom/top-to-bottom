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
    allowNull: false,
    get() {
      return () => this.getDataValue('password')
    },
    salt: {
      type: Sequelize.STRING,
      // Making `.salt` act like a function hides it when serializing to JSON.
      // This is a hack to get around Sequelize's lack of a "private" option.
      get() {
        return () => this.getDataValue('salt')
      }
    },
   
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
 },
 googleId: {
  type: Sequelize.STRING
}

})

module.exports = User




/**
 * instanceMethods
 */

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}





/**
 * hooks
 */



const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}


User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)