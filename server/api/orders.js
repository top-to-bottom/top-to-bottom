const router = require('express').Router()
const {Order, OrderData, Product, User} = require('../db/models')
const {isAdminMW, isAuthMW} = require('../middleware/auth')
module.exports = router

router.get('/me', isAuthMW, async (req, res, next) => {
  const userId = req.user.id
  try {
    const orders = await Order.findAll({
      include: {model: OrderData, include: Product},
      where: {userId}
    }) // Review and add a method to the model Nathan
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/', isAdminMW, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {model: User, attributes: ['email']},
        {model: OrderData, include: Product}
      ]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', isAdminMW, async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id, {
      include: [
        {model: User, attributes: ['email']},
        {model: OrderData, include: Product}
      ]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdminMW, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id, {
      include: [
        {model: User, attributes: ['email']},
        {model: OrderData, include: Product}
      ]
    })
    const updatedOrder = await order.update({status: req.body.status})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
