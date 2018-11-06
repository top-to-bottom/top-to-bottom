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
      firstName: 'john',
      lastName: 'doe',
      email: 'john@doe.com',
      streetAddress: '123 Place St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '12345'
    }),
    Address.create({
      firstName: 'emily',
      lastName: 'cubs',
      email: 'Ilove@cubs.com',
      streetAddress: '908 Cool Road',
      city: 'New York',
      state: 'NY',
      zipCode: '09876'
    })
  ])
  console.log(`seeded ${addresses.length} addresses`)

  const categories = await Promise.all([
    Category.create({name: 'hats'}),
    Category.create({name: 'shoes'})
  ])
  console.log(`seeded ${categories.length} categories`)

  const products = await Promise.all([
    Product.create({
      name: 'Hat',
      description: 'A hat to wear on your head.',
      price: 999,
      defaultImageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71odJc-Sd2L._UX385_.jpg',
      categoryId: 1
    }),
    Product.create({
      name: 'Shoes',
      description: 'A pair of shoes to wear on your feet.',
      price: 2950,
      categoryId: 2
    }),
    Product.create({
      name: 'Mens Fedoras',
      description:
        'Keep your outfit ready for whatever the day brings with the Fedora from Goodfellow & Co™. This black hat offers a chic twist to the classic fedora with the wide, flat brim, while the faux leather band adds an extra spark. For an easy autumn day out, pair this hat with dark jeans, leather boots and a striped long-sleeve T-shirt.',
      price: 2099,
      defaultImageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_de11ac58-5cbe-4f87-8c1e-bf79cf8eca31?wid=1400',
      categoryId: 1
    }),
    Product.create({
      name: 'Womens Panama Hat - Universal Thread',
      description:
        'Sport a timeless and elegant look with the Panama Hat from Universal Thread™. Made from 100% wool for breathability and comfort, this classic Panama hat protects you from the sun while adding the perfect touch of style to your look. Whether you are in a fit-and-flare dress with booties or skinny jeans and a sweater, this hat ties your look together in functional style.',
      price: 9999,
      defaultImageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_6ec464c3-519f-41c3-8011-ff3a2bccff47?wid=1400',
      categoryId: 1
    }),
    Product.create({
      name: 'Large Herringbone Wool Blend Ivy Cap',
      description:
        'The Jaxon Large Herringbone Ivy Cap is bigger and better. Featuring a large herringbone print paired with a dark charcoal base, the Jaxon Large Herringbone Ivy Cap is a bold take on the standard herringbone patterned flat cap.',
      price: 5999,
      defaultImageUrl:
        'https://www.villagehatshop.com/photos/product/giant/4511390S60982/alt/60982.jpg',
      categoryId: 1
    }),
    Product.create({
      name: 'Men Cotton Gatsby ',
      description:
        'Flat Beret Cap Adjustable Knit Ivy Hat Golf Hunting Driving Cabbie HaMen Cotton Gatsby Flat Beret Cap Adjustable Knit Ivy Hat Golf Hunting Driving Cabbie Ha',
      price: 3099,
      categoryId: 1
    }),
    Product.create({
      name: 'Fleece-lined Hat with Earflaps',
      description:
        'Soft knit hat with a pompom at top and earflaps. Fleece lining.',
      price: 100000099,
      defaultImageUrl:
        'https://lp2.hm.com/hmgoepprod?set=source[/40/78/4078af7fc52620530628e8436dafc385c9928546.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[1]&call=url[file:/product/main]',
      categoryId: 1
    }),
    Product.create({
      name: 'Mens Demonia Boxer 01, Adult, Size: 11 M, Black PU',
      description:
        'These cool black faux leather sneakers have an incredible 4 inch high platform heel. Canvas and faux leather upper has a sneaker style with lace up front and topstitched detail. The unique, multi ridged platform heel is stable and comfortable. Made in US Mens sizes, see our size conversion chart to convert to other sizes. All man-made materials with padded insole and non-skid sole',
      price: 99,
      defaultImageUrl:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR09vC-EFdQ38088LrELbReiQnxJKma7cHCo2xlk1Desth0tRugY9Tj-He7xw9B2HTf2l9ZydnFPTLM7g3m0s6597B6_Y8J&usqp=CAY',
      categoryId: 2
    }),
    Product.create({
      name: 'TOMS Shoes Shaye Black Suede 10012283 (Womens) 8.5',
      description:
        'TOMS-Shaye Bootie Stay on top of your favorite trends with the Shaye bootie from Toms. This silhouette features soft suede upper that will go great with tights and a playful dress! About The Brand: Toms was founded with one mission in mind: to match every pair of purchased shoes with a new pair for a child in need. With your help, 35 million pairs of shoes have found new homes with happy little feet and the One for One model continues to expand year after year.',
      price: 4099,
      defaultImageUrl:
        'https://lh3.googleusercontent.com/proxy/iGiAQpyS4A6drgSs2B9e2R1qPgYDvr4fZ44AQhosJLuCgS63KBI9hIZDkKPg66YyRUiSuB5uB67pu6w5Das3WxTHcx6guq7REHeojLbTl3udgaK3LWlQZFM15qUamFditmMbrq0bQ525eEEbfjeNlMSN4UdRl_tYNPI7GsHX11w-PyTL5VS856B8EIpYcO00mwaG-2ScCZMFPnpaYKVSHRk=s800-pd-e365-rw-pc0xffffff',
      categoryId: 2
    }),
    Product.create({
      name: 'Easy Spirit Ailene Womens Shoes Black : 9 M (B)',
      description:
        'Easy Spirit-Ailene Pump Add a little bit of height to your look without sacrificing comfort in the Ailene pump from Easy Spirit. A plush footbed and low block heel make these pumps the perfect go-all-night evening option.',
      price: 9999,
      defaultImageUrl:
        'https://www.easyspirit.com/media/catalog/product/cache/image/e9c3970ab036de70892d86c6d221abfe/P/G/PG.SEAILENE-BLK01.PZ.jpg',
      categoryId: 2
    })
  ])
  console.log(`seeded ${products.length} products`)

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
      status: 'processing',
      userId: 2
    }),
    Order.create({
      date: new Date(),
      isRegister: false,
      status: 'created'
    }),
    Order.create({
      date: new Date(),
      isRegister: true,
      status: 'completed',
      userId: 2
    }),
    Order.create({
      date: new Date(),
      isRegister: true,
      status: 'cancelled',
      userId: 1
    })
  ])
  console.log(`seeded ${orders.length} orders`)

  const orderDataSeed = await Promise.all([
    OrderData.create({
      quantity: 1,
      price: 1099,
      orderId: 1,
      productId: 1
    }),
    OrderData.create({
      quantity: 1,
      price: 3050,
      orderId: 1,
      productId: 2
    }),
    OrderData.create({
      quantity: 2,
      price: 3050,
      orderId: 3,
      productId: 2
    }),
    OrderData.create({
      quantity: 2,
      price: 150,
      orderId: 2,
      productId: 1
    }),
    OrderData.create({
      quantity: 10,
      price: 1150,
      orderId: 4,
      productId: 1
    })
  ])
  console.log(`seeded ${orderDataSeed.length} rows of orderData`)

  const reviews = await Promise.all([
    Review.create({
      text:
        'This hat is awesome. I love this hat. I wear this hat on my head, I wear this hat in bed. I wear this hat when I am cold, I will wear this hat when I am hold.',
      stars: 5,
      productId: 1,
      userId: 1
    }),
    Review.create({
      text:
        'The left shoe is more comfortable than the right shoe. Both shoes are comfortable. I like to wear them on my feet.',
      stars: 4,
      productId: 2,
      userId: 1
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
