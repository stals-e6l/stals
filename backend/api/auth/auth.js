const { Router } = require('express')
const user = require('../../entities/user')

const auth = Router()

/**
 * @openapi
 *
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            required: true
 *          password:
 *             type: string
 *             required: true
 *             format: password
 *      Token:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *            required: true
 *
 *
 * /api/signup:
 *  post:
 *    description: Signs up new user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  data:
 *                    $ref: '#/components/schemas/User'
 *
 * /api/signin:
 *  post:
 *    description: Signs in existing user
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  data:
 *                    $ref: '#/components/schemas/Token'
 *
 */
auth.post('/api/signup', async (req, res) => {
  try {
    const result = await user.create(req.body)

    if (!result) {
      throw new Error('Error creating user!')
    }

    res.status(201).json({
      status: 'ok',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      messages: [String(err)],
    })
  }
})

auth.post('/api/signin', async (req, res) => {
  try {
    const result = await user.findOne({ username: req.body.username })

    if (!result) throw new Error('User not signed up!')

    res.status(200).json({
      status: 'ok',
      data: {
        token: 'sometoken',
      },
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      messages: [String(err)],
    })
  }
})

module.exports = auth
