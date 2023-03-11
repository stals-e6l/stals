const express = require('express')

const server = express()
const PORT = 5000
const HOST = 'localhost'

const startServer = async () => {
  try {
    server.listen(PORT, HOST, () =>
      console.log(`backend: http://${HOST}:${PORT}`)
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  startServer,
  PORT,
  HOST,
}
