const router = require('express').Router()
const {Cart, CartData, Product} = require('../db/models')

//Find cart
router.get('/:userId', (req, res, next) => {
  try {
    if (req.params.userId === 'undefined') {
      Cart.findOrCreate({
        where: {sessionId: req.session.id},
        include: [
          {
            model: CartData,
            include: [
              {
                model: Product
              }
            ]
          }
        ]
      }).spread((cart, created) => {
        if (created) {
          cart.sessionId = req.session.id
          cart.save()
        }

        res.send(cart)
      })
    } else {
      Cart.findOrCreate({
        where: {
          userId: req.params.userId
        },
        include: [
          {
            model: CartData,
            include: [
              {
                model: Product
              }
            ]
          }
        ]
      }).spread((cart, created) => {
        if (created) {
          cart.userId = req.params.userId
          cart.save()
        }

        res.send(cart)
      })
    }
  } catch (err) {
    next(err)
  }
})

//Add product to cart
router.put('/:userId', async (req, res, next) => {
  try {
    const product = req.body
    if (req.params.userId === 'undefined') {
      const cart = await Cart.findOne({
        where: {
          sessionId: req.session.id
        }
      })
      if (cart) {
        CartData.findOrCreate({
          where: {
            cartId: cart.id,
            productId: product.id
          }
        }).spread(async (cartData, created) => {
          if (created) {
            cartData.quantity = 1
          } else {
            cartData.quantity += 1
          }

          cartData.price = cartData.quantity * product.price
          await cartData.save()

          res.send(cart)
        })
      } else {
        res.sendStatus(404)
      }
    } else {
      const cart = await Cart.findOne({
        where: {
          userId: req.params.userId
        }
      })
      if (cart) {
        CartData.findOrCreate({
          where: {
            cartId: cart.id,
            productId: product.id
          }
        }).spread(async (cartData, created) => {
          if (created) {
            cartData.quantity = 1
          } else {
            cartData.quantity += 1
          }

          cartData.price = cartData.quantity * product.price
          await cartData.save()

          res.send(cart)
        })
      } else {
        res.sendStatus(404)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.put('/cartItem/:cartItemId', async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId
    const cartItem = await CartData.findOne({
      where: {id: cartItemId},
      include: [{model: Product}]
    })
    const newQuantity = req.body.quantity
    if (newQuantity < 1) {
      await cartItem.destroy()
      res.sendStatus(202)
    } else {
      //[numUpdated, updatedItems]
      const updatedCartItem = await cartItem.update({
        quantity: newQuantity,
        price: cartItem.product.price * newQuantity
      })
      res.send(updatedCartItem)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await CartData.destroy({
      where: {
        id: Number(req.params.id)
      }
    })
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

module.exports = router
