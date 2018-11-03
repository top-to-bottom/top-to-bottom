const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: Category,
      where: req.query.search
        ? {name: {[Op.iLike]: `%${req.query.search}%`}}
        : {}
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id, {include: Review})
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = req.body
    const {data} = await Product.update(product, {where: {id}})
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({where: {id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
