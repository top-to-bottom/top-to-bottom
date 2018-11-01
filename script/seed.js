'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Category,
  Inventory,
  Order,
  OrderData,
  Review,
  Address
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Hat',
      lastName: 'Lady',
      username: 'hatlover123',
      email: 'ilovehats@aol.com',
      password: 'abc123',
      isAdmin: false,
      accountActivity: true
    }),
    User.create({
      firstName: 'Shoe',
      lastName: 'Guy',
      username: 'theshoedude',
      email: 'shoe4u@hotmail.com',
      password: 'shoe12',
      isAdmin: true,
      accountActivity: true
    })
  ])
  console.log(`seeded ${users.length} users`)

  const addresses = await Promise.all([
    Address.create({
      streetAddress: '123 Place St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '12345'
    }),
    Address.create({
      streetAddress: '908 Cool Road',
      city: 'New York',
      state: 'NY',
      zipCode: '09876'
    })
  ])
  console.log(`seeded ${addresses.length} addresses`)

  const products = await Promise.all([
    Product.create({
      name: 'Hat',
      description: 'A hat to wear on your head.',
      price: 9.99,
      defaultImageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71odJc-Sd2L._UX385_.jpg'
    }),
    Product.create({
      name: 'Shoes',
      description: 'A pair of shoes to wear on your feet.',
      price: 29.5
    })
  ])
  console.log(`seeded ${products.length} products`)

  const categories = await Promise.all([
    Category.create({name: 'hats'}),
    Category.create({name: 'shoes'})
  ])
  console.log(`seeded ${categories.length} categories`)

  const inventoryData = await Promise.all([
    Inventory.create({
      size: 'large',
      quantity: 3
    }),
    Inventory.create({
      size: '10',
      quantity: 1
    }),
    Inventory.create({
      size: '8.5',
      quantity: 2
    })
  ])
  console.log(`seeded ${inventoryData.length} rows of inventory`)

  const orders = await Promise.all([
    Order.create({
      date: new Date(),
      isRegister: true,
      submitted: true,
      status: 'processing'
    }),
    Order.create({
      date: new Date(),
      isRegister: false,
      submitted: false,
      status: 'created'
    })
  ])
  console.log(`seeded ${orders.length} orders`)

  const orderDataSeed = await Promise.all([
    OrderData.create({
      quantity: 1,
      isOrdered: true,
      price: 9.99
    }),
    OrderData.create({
      quantity: 1,
      isOrdered: false,
      price: 29.5
    })
  ])
  console.log(`seeded ${orderDataSeed.length} rows of orderData`)

  const reviews = await Promise.all([
    Review.create({
      text:
        'This hat is awesome. I love this hat. I wear this hat on my head, I wear this hat in bed. I wear this hat when I am cold, I will wear this hat when I am hold.',
      stars: 5,
      productId: 1
    }),
    Review.create({
      text:
        'The left shoe is more comfortable than the right shoe. Both shoes are comfortable. I like to wear them on my feet.',
      stars: 4,
      productId: 2
    })
  ])
  console.log(`seeded ${reviews.length} reviews`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
