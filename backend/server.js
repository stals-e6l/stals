require('./config')
const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')
const { connectDb } = require('./db')
var bodyParser = require('body-parser')
const { authGuard } = require('./handler/auth_middleware')
const { publicAccomm } = require('./api/public_accommodation')
const {
  signUpEndpoint,
  signInEndpoint,
  signOutEndpoint,
  meEndpoint,
  editUserEndpoint,
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
          title: 'Student Accommodation and Lodging System API',
          version: '1.0.0',
          description: "The Student Accommodation and Lodging System is an application that allows tenants to look for accommodations such as dormitories, bedspaces, hotels, etc. around UPLB. The following are the API included in the application:" +
          "\n\n1. **Add, update, delete, and retrieve accommodations.**" +
          "\n\n\tThis allows users to create, update, delete, and view accommodation listings." +
          "\n\n2. **Add, update, delete, and retrieve reports.**" +
          "\n\n\tThis allows users to create a report that includes the accommodations that they want to appear." +
          "\n\n3. **Add, update, delete, and retrieve reviews.**" +
          "\n\n\tThis allows users to leave a review on the accommodation listings." +
          "\n\nThe following are the users that are able to access each endpoint:" +
          "\n\n* Accommodation" +
          "\n\n\t- Create - administrators and accommodation owners" +
          "\n\n\t- Retrieve - administrators, accommodation owners, tenants, and unregistered users" +
          "\n\n\t- Update - administrators and accommodation owners" +
          "\n\n\t- Delete - administrators and accommodation owners" +
          "\n\n* Report" +
          "\n\n\t- Create - administrators, accommodation owners, and tenants" +
          "\n\n\t- Retrieve - administrators" +
          "\n\n\t- Update - administrators" +
          "\n\n\t- Delete - administrators" +
          "\n\n* Review" +
          "\n\n\t- Create - administrators, accommodation owners, and tenants" +
          "\n\n\t- Retrieve - administrators, accommodation owners, and tenants" +
          "\n\n\t- Update - administrators, accommodation owners, and tenants" +
          "\n\n\t- Delete - administrators, accommodation owners, and tenants" +
          "\n\nIn order to access the endpoints below, you must first **sign up and login** using your credentials. A **token will be returned** and you must copy paste this inside the **Authorize button** in the __top right of the screen__."
        },
      },
    })
  )
)

server.use(bodyParser.json())

/** INSERT API BELOW */
server.use('/api/sign-up', signUpEndpoint)
server.use('/api/sign-in', signInEndpoint)
server.use('/api/ping', require('./api/ping'))
server.use('/api/public_accommodation', publicAccomm)
server.use('/api/asset', express.static(require('./api/assets').ASSETS_DIR))
server.use(authGuard)
server.get('/api/me', meEndpoint)
server.put('/api/me', editUserEndpoint)
server.use('/api/sign-out', signOutEndpoint)

server.use('/api', require('./api/accommodation'))
server.use('/api', require('./api/review'))
server.use('/api', require('./api/report'))
server.use('/api', require('./api/assets').assetsRouter)

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
