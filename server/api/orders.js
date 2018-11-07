const router = require('express').Router()
const {Order, OrderData, Product, User, Cart, Address} = require('../db/models')
const {isAdminMW, isAuthMW} = require('../middleware/auth')
module.exports = router
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/me', isAuthMW, async (req, res, next) => {
  const userId = req.user.id
  try {
    const orders = await Order.findAll({
      include: {model: OrderData, include: Product},
      where: {userId}
    })
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

router.get('/charge', async (req, res, next) => {
  // const userId = req.user.id

  const charge = await stripe.charges.create({
    amount: 100,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com'
  })

  console.log(charge)
  res.json(charge)
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

router.post('/', async (req, res, next) => {
  try {
    const {address, cartId} = req.body
    const cart = await Cart.findById(cartId)
    const addressOnDB = await Address.findOrCreate({where: address})
    const {order} = await Order.fromCart(addressOnDB, cart)
    res.json(order)
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
