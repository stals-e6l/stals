const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/v2/user')
const { ERRORS, UNAUTHORIZED, BAD_REQUEST} = require('../handler/error_handler')
const { CREATED, OK } = require('../handler/success_handler')

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
const signUpEndpoint = async(req, res) => {
  try {
    let regex = new RegExp('^[a-z0-9]+@[a-z]+\\.[a-z]{2,3}$')

    if (!regex.test(req.body.email)) {
      throw Error("Email is invalid")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    if (!hashedPassword) {
      throw Error("Password is not found")
    }

    const user = await User.create({ ...req.body, password: hashedPassword })

    if (!user) {
      throw Error("User is not found")
    }

    res.status(CREATED).json({
      success: true,
      data: { username: user.username, email: user.email, role: user.role },
    })
  } catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
  }
}

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

const signInEndpoint = async(req, res) => {
  try {
    // first, extract the req payload
    const username = req.body.username
    const password = req.body.password

    // second, validate if user indeed exists
    const user = await User.findOne({ username: username })
    if (!user) throw Error("We don't know this user. Try to sign up.")

    // third, check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("Password is incorrect")

    // fourth, generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      PRIVATE_KEY
    )

    // fifth, remove token in blacklist if existing
    if (blacklist[token]) delete blacklist[token]

    // last, return success
    res.status(OK).json({ success: true, data: token })
  } catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
  }
}

/**
 * @openapi
 * /api/sign-out:
 *      post:
 *          description: Sign out
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
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *
 */
const signOutEndpoint = async(req, res) => {
  try {
    // Extract the auth header
    const authHeader = req.headers.authorization
    if (!authHeader) throw Error("Your request needs authentication")

    // Extract token
    const [authMethod, token] = authHeader.split(' ')
    if (authMethod !== 'Bearer') throw Error("Invalid authentication method")

    if (!token) throw Error("Invalid authentication method")

    // Add token to blacklist
    if (!blacklist[token]) blacklist[token] = token

    res
      .status(OK)
      .json({ success: true, data: 'You are successfully logged out!' })
  } catch (err) {
    res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
  }
}

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
const meEndpoint = async(req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw Error("Your request needs to be authenticated")
    }

    const [authMethod, token] = authHeader.split(' ')

    if (authMethod !== 'Bearer') {
      throw Error("Invalid authentication method")
    }

    if (!token) {
      throw Error("Invalid authentication method")
    }

    let decoded;

    try {
      decoded = jwt.verify(token, PRIVATE_KEY)
    } catch(err) {
      throw Error("You are not authenticated")
    }

    const dbUser = await User.findOne({_id: decoded.id}).select('-password');

    if (!dbUser) {
      throw Error("We don't know this user. Try to sign up.")
    }

    res.status(OK).json({ success: true, data: dbUser })
  } catch (err){
    res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
  }
}

module.exports = { signUpEndpoint, signInEndpoint, signOutEndpoint, meEndpoint };
