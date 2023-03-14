const { Router } = require('express')

const ping = Router()

/**
 * @openapi
 *
 * components:
 *  schemas:
 *    PingPong:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        data:
 *          type: object
 *          properties:
 *            message: string
 *      example:
 *        status: ok
 *        data:
 *          message:
 *              pong
 *
 * /api/ping:
 *  get:
 *    description: Pings the server
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/PingPong'
 */
ping.get('/api/ping', (req, res) => {
  res.json({
    status: 'ok',
    data: {
      message: 'pong',
    },
  })
})

module.exports = ping
