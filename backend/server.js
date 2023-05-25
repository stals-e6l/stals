require('./config')
const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')
const { connectDb } = require('./db')
var bodyParser = require('body-parser')
const { authGuard } = require('./handler/auth_middleware')
const {
  signUpEndpoint,
  signInEndpoint,
  signOutEndpoint,
  meEndpoint,
} = require('./api/auth')

const server = express()
const PORT = process.env.PORT
const HOST = process.env.HOST

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

server.use(bodyParser.json())

/** INSERT API BELOW */
server.use('/api/sign-up', signUpEndpoint)
server.use('/api/sign-in', signInEndpoint)
server.use(authGuard)
server.use('/api/me', meEndpoint)
server.use('/api/sign-out', signOutEndpoint)
server.use('/api/ping', require('./api/ping'))
server.use('/api', require('./api/accommodation'))
server.use('/api', require('./api/review'))
server.use('/api', require('./api/report'))
server.use('/api', require('./api/assets'))

/** END API */

const startServer = async () => {
  try {
    await connectDb()
    server.listen(PORT, HOST, () => {
      console.log(`allowable_cors: ${CORS_ALLOWABLE}`)
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
