
const Sequelize = require('sequelize')
const db = require('../db')

const OrderData = db.define('orderData', {

    quantity: {
        type: Sequelize.INTEGER
    },
    isOrdered: Sequelize.BOOLEAN,
    price: {
   type: Sequelize.DECIMAL(10,2),
   allowNull: false
      
    }
    

})




module.exports = OrderData