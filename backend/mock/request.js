const supertest = require('supertest')
const { server } = require('../server')

const request = supertest(server)

module.exports = request
