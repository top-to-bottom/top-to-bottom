const router = require('express').Router()
const nodemailer = require('nodemailer')
const OrderData = require('../db/models/orderData')
const Product = require('../db/models/product')
module.exports = router

router.post('/welcome', async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OnlyShoesAndHats@gmail.com',
      pass: '#t0p2BOTOM'
    }
  })

  const mailOptions = {
    from: 'OnlyShoesAndHats@gmail.com',
    to: `${req.body.recipient}`,
    subject: 'Welcome to Top-To-Bottom, a hat and shoe store.',
    html: `<h1><a href="https://top-to-bottom.herokuapp.com">Welcome to Top-To-Bottom!</a></h1><p>Dear ${
      req.body.firstName
    } (aka ${
      req.body.username
    }),<br>Thanks for signing up at <a href="https://top-to-bottom.herokuapp.com">Top-To-Bottom</a>!</p><p>We got you covered at head and toe, but never in the middle.</p><br>Cheers!`
  }

  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
      res.status(201).send('Email Sent!')
    }
  })
})

router.post('/order-confirmation', async (req, res, next) => {
  const orderData = await OrderData.findAll({
    where: {orderId: req.body.id},
    include: {model: Product}
  })

  const productsOrdered = orderData.map(product => product.product)

  const productNames = productsOrdered.filter(name => name.name)

  const productNameList = productNames.map(prod => prod.name).join(', ')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'OnlyShoesAndHats@gmail.com',
      pass: '#t0p2BOTOM'
    }
  })

  const mailOptions = {
    from: 'OnlyShoesAndHats@gmail.com',
    to: `${req.body.customer.email}`,
    subject: 'Thanks for shopping at Top-To-Bottom!',
    html: `<div><h1>Thanks, ${
      req.body.customer.firstName
    }!</h1><p>Your order includes: ${productNameList}</p><p>Stay tuned for more information about your order.</p><p>Cheers!</p></div>`
  }

  await transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
      res.status(201).send('Email Sent!')
    }
  })
})
