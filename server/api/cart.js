const router = require('express').Router()
const {Cart, Product} = require('../db/models')

//Find cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOrCreate({where: {sessionId: req.session.id}})
    res.send(cart)
  } catch (err) {
    next(err)
  }
})

//Find products inside a cart
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{model: Cart, where: {sessionId: req.session.id}}]
    })

    if (products) {
      res.send(products)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

//Add product to cart
router.put('/', async (req, res, next) => {
  try {
    const productId = req.body.productId
    const cart = await Cart.findOne({where: {sessionId: req.session.id}})
    await cart.addProducts([productId])
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
