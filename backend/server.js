require('./config')
const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')
const { connectDb } = require('./db')

const server = express()
const PORT = 5000
const HOST = 'localhost'

const MORGAN_STYLE = process.env.MORGAN_STYLE
const SWAGGER_PATH = '/docs'
const CORS_ALLOWABLE = process.env.CORS_ALLOWABLE

server.use(morgan(MORGAN_STYLE))
server.use(cors({ origin: CORS_ALLOWABLE }))
server.use(
  SWAGGER_PATH,
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      apis: ['./api/*.js'],
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'stals API',
          version: '1.0.0',
        },
      },
    })
  )
)

/** INSERT API BELOW */
server.use('/api/ping', require('./api/ping'))

/** END API */

const startServer = async () => {
  try {
    await connectDb()
    server.listen(PORT, HOST, () => {
      console.log(`backend: http://${HOST}:${PORT}`)
      console.log(`api_docs: http://${HOST}:${PORT}${SWAGGER_PATH}`)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = {
  startServer,
  PORT,
  HOST,
  server,
}
