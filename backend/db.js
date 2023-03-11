const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/test' // TODO: dynamic

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
