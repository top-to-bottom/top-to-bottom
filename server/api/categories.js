const router = require('express').Router()
const {Product, Review, Category} = require('../db/models')
const Sequelize = require('sequelize')
const {isAdminMW} = require('../middleware/auth')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: Product
    })
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdminMW, async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(201)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const category = await Category.findById(id, {include: Product})
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.put('/:categoryId', isAdminMW, async (req, res, next) => {
  try {
    const id = req.params.categoryId
    const category = req.body
    const {data} = await Category.update(category, {where: {id}})
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:categoryId', isAdminMW, async (req, res, next) => {
  try {
    const id = req.params.categoryId
    await Category.destroy({where: {id}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
