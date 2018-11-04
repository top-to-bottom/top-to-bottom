const router = require('express').Router()
const {Review, Product, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: Product}]
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201)
    res.json(review)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const review = await Review.findById(id, {include: [Product, User]})
    res.json(review)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const review = req.body
    const {data} = await Review.update(review, {where: {id}})
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Review.destroy({where: {id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
