const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log(`db: ${DB_URL}`)
  } catch (_) {
    throw new Error(`DB_ERROR: Error to connect in ${DB_URL}`)
  }
}

module.exports = {
  connectDb,
  DB_URL,
}
