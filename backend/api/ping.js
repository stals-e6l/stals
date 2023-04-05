const { Router } = require('express')

const ping = Router()

/**
 * @openapi
 * /api/ping:
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
ping.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: 'hello',
  })
})

module.exports = ping
