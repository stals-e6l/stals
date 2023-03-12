const { Router } = require('express')
const user = require('../entities/user')

const auth = Router()

/**
 * @openapi
 * /api/auth/signup:
 *      post:
 *          description: Signs up new use
 *          consumes: application/json
 *          parameters:
 *              - name: username
 *                type: string
 *                required: true
 *              - name: password
 *                type: string
 *                required: true
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 */
auth.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
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

module.exports = auth
