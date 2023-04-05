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

/**
 * @openapi
 * /api/ping:
 *      post:
 *          description: Pings the server (post)
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *
 */
ping.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    data: req.body.data,
  })
})

module.exports = ping
