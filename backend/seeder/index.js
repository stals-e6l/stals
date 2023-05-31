require('../config')
const { connectDb } = require('../db')
const seedAccommodations = require('./accommodation')

// connectDb()
//   .then(() => {
//     seedAccommodations()
//   })
//   .catch(err => {
//     console.error(err)
//   })
//   .finally(() => {
//     process.exit(0)
//   })
async function seed() {
  try {
    await connectDb()
    await seedAccommodations()
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
}

seed()
