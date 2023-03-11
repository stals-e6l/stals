const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const ping = require('./api/ping')

const server = express()
const PORT = 5000
const HOST = 'localhost'

const MORGAN_STYLE = 'dev' // TODO: dynamic
const SWAGGER_PATH = '/docs'

server.use(morgan(MORGAN_STYLE))
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

server.use(ping)

const startServer = async () => {
  try {
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
}
