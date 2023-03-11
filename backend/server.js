const express = require('express')
const morgan = require('morgan')

const server = express()
const PORT = 5000
const HOST = 'localhost'

const MORGAN_STYLE = 'dev' // TODO: dynamic

server.use(morgan(MORGAN_STYLE))

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
