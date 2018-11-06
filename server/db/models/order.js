const Sequelize = require('sequelize')
const db = require('../db')
const OrderData = require('./orderData')

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

Order.fromCart = async (address, cart) => {
  const date = new Date()
  const isRegister = !!cart.userId
  const session = cart.sessionId
  const status = 'created'
  const cartData = await cart.getCartData()
  const userId = isRegister ? cart.userId : null
  const order = await Order.create({date, isRegister, session, status, userId})
  const orderNewData = cartData.map(data => ({
    quantity: data.dataValues.quantity,
    price: data.dataValues.price / data.dataValues.quantity,
    productId: data.dataValues.productId,
    orderId: order.id
  }))
  await OrderData.bulkCreate(orderNewData)
  await cart.setCartData()
  return {order}
}

module.exports = Order
