const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/v2/user')

const authRouter = Router()
const saltRounds = 10
const PRIVATE_KEY = process.env.PRIVATE_KEY

let blacklist = {}

/**
 * @openapi
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - password
 *              - email
 *              - role
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
 *              email:
 *                  type: string
 *                  description: Email of user
 *              role:
 *                  type: string
 *                  pattern: '^((admin)|(owner)|(tenant))$'
 *                  description: Role of the user
 *
 *      Login:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
 * security:
 *      - bearerAuth: []
 *
 */

/**
 * @openapi
 * /api/sign-up:
 *      post:
 *          description: Create user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Null Error
 *              422:
 *                  description: Unprocessable Entity
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *
 */

authRouter.post('/sign-up', async function (req, res) {
  try {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

    if (!regex.test(req.body.email)) {
      const error = new Error('Not a valid email')
      error.name = 'ValidationError'
      throw error
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    if (!hashedPassword) {
      const error = new Error('Internal server error')
      throw error
    }

    const user = await User.create({ ...req.body, password: hashedPassword })

    if (!user) {
      const error = new Error('Internal server error')
      throw error
    }

    return res.status(201).json({
      success: true,
      data: { username: user.username, email: user.email, role: user.role },
    })
  } catch (err) {
    let code

    switch (err.name) {
      case 'ValidationError':
        code = 400
        break
      case 'CastError':
        code = 400
        break
      case 'NullError':
        code = 404
        break
      case 'UnprocessableContent':
        code = 422
        break
      default:
        code = 500
    }

    res.status(code).json({ success: false, messages: [String(err)] })
  }
})

/**
 * @openapi
 * /api/sign-in:
 *      post:
 *          description: Sign in
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Login'
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *
 */

authRouter.post('/sign-in', async function (req, res) {
  try {
    // first, extract the req payload
    const username = req.body.username
    const password = req.body.password

    // second, validate if user indeed exists
    const user = await User.findOne({ username: username })
    if (!user) throw new Error('No User Found')

    // third, check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Wrong password')

    // fourth, generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      PRIVATE_KEY
    )

    // fifth, remove token in blacklist if existing
    if (blacklist[token]) delete blacklist[token]

    // last, return success
    res.status(200).json({ success: true, data: token })
  } catch (err) {
    let code

    switch (err.name) {
      case 'ValidationError':
        code = 400
        break
      case 'CastError':
        code = 400
        break
      case 'NullError':
        code = 404
        break
      default:
        code = 500
    }

    res.status(code).json({ success: false, messages: [String(err)] })
  }
})

/**
 * @openapi
 * /api/sign-out:
 *      post:
 *          description: Sign out
 *          security:
 *              -   bearerAuth: []
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *
 */
authRouter.post('/sign-out', async function (req, res) {
  try {
    // Extract the auth header
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Error('No auth header!')

    // Extract token
    const [authMethod, token] = authHeader.split(' ')
    if (authMethod !== 'Bearer')
      throw new Error('Auth method should be "Bearer"!')
    if (!token) throw new Error('No token!')

    // Add token to blacklist
    if (!blacklist[token]) blacklist[token] = token

    res
      .status(200)
      .json({ success: true, data: 'You are successfully logged out!' })
  } catch (err) {
    let code

    switch (err.name) {
      case 'ValidationError':
        code = 400
        break
      case 'CastError':
        code = 400
        break
      case 'AuthError':
        code = 401
        break
      case 'NullError':
        code = 404
        break
      default:
        code = 500
    }

    res.status(code).json({ success: false, messages: [String(err)] })
  }
})

/**
 * @openapi
 * /api/me:
 *      get:
 *          description: Get user endpoint
 *          security:
 *              -   bearerAuth: []
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Authentication Error.
 *              500:
 *                  description: Internal Server error.
 *              404:
 *                  description: User does not exist.
 *          tags:
 *              - User
 *
 */
authRouter.get('/me', async function (req, res) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      const error = new Error("Header doesn't exist")
      error.name = 'AuthError'
      throw error
    }

    const [authMethod, token] = authHeader.split(' ')

    if (authMethod !== 'Bearer') {
      const error = new Error('Auth method is not bearer')
      error.name = 'AuthError'
      throw error
    }

    if (!token) {
      const error = new Error("Token doesn't exist")
      error.name = 'AuthError'
      throw error
    }

  let decoded;

	try {
    decoded = jwt.verify(token, PRIVATE_KEY)
	} catch(err) {
    const error = new Error("Verification error")
    error.name = 'AuthError'
    throw error
	}

    const dbUser = await User.findOne({_id: decoded.id}).select('-password');

    if (!dbUser) {
      const error = new Error("User doesn't exist")
      error.name = 'NullError'
      throw error
    }

    res.status(200).json({ success: true, data: dbUser })
  } catch (err) {
    let code

    switch (err.name) {
      case 'ValidationError':
        code = 400
        break
      case 'CastError':
        code = 400
        break
      case 'AuthError':
        code = 401
        break
      case 'NullError':
        code = 404
        break
      default:
        code = 500
    }

    res.status(code).json({ success: false, messages: [String(err)] })
  }
})

module.exports = authRouter
