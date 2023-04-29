require('../config')
const { connectDb } = require('../db')
const seedAccommodations = require('./accommodation')

connectDb()
  .then(() => {
    seedAccommodations()
  })
  .finally(() => {
    process.exit(0)
  })
