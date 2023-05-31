const { Router } = require('express')

const ping = Router()

ping.get('/', (req, res) => {
  res.json('Hello World!')
})

module.exports = ping
