const router = require('express').Router()
const {Order, OrderData, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {model: OrderData, include: Product},
      where: {userId: 2}
    }) // Review and add a method to the model Nathan
    res.json(orders)
  } catch (error) {
    next(error)
  }
})
