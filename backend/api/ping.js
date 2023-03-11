const { Router } = require('express')

const ping = Router()

/**
 * @openapi
 * /ping:
 *      get:
 *          description: Pings the server
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *
 */
ping.get('/ping', (req, res) => {
  res.json('Hello World!')
})

module.exports = ping
