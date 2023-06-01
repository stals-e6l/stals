const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/v3/user')
const {
  ERRORS,
  UNAUTHORIZED,
  BAD_REQUEST,
} = require('../handler/error_handler')
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
 *              - full_name
 *              - gender
 *              - phone
 *              - biography
 *              - birthday
 *              - username
 *              - password
 *              - email
 *              - role
 *              - organization
 *          properties:
 *              full_name:
 *                  type: object
 *                  description: Name of the user
 *                  properties:
 *                    first_name:
 *                      type: string
 *                    middle_name:
 *                      type: string
 *                    last_name:
 *                      type: string
 *                  required:
 *                    - first_name
 *                    - last_name
 *              gender:
 *                  type: string
 *                  pattern: '^((male)|(female)|(non_binary)|(prefer_not_to_say))$'
 *                  description: Gender of the user
 *              phone:
 *                type: object
 *                description: Phone or Landline number of the user
 *                properties:
 *                  landline:
 *                    type: string
 *                    pattern: '^((\d){7,8})$'
 *                  mobile:
 *                    type: string
 *                    pattern: '^(\+63(\d){10})$'
 *              address:
 *                type: object
 *                description: Phone or Landline number of the user
 *                properties:
 *                  home:
 *                    type: string
 *                  current:
 *                    type: string
 *                required:
 *                  - home
 *                  - current
 *              biography:
 *                  type: string
 *                  description: Biography of the user
 *              birthday:
 *                  type: string
 *                  format: date
 *                  description: Birthday of the user
 *              username:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
 *              email:
 *                  type: string
 *                  description: Email of user
 *              avatar:
 *                  type: object
 *                  properties:
 *                      url:
 *                          type: string
 *                          description: URL of
 *              role:
 *                  type: string
 *                  pattern: '^((admin)|(owner)|(tenant))$'
 *                  description: Role of the user
 *              organization:
 *                  type: string
 *                  description: Organization of the user
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
 *          description: |
 *            This endpoint creates a user from the request body and **returns the created user**.
 *
 *            ### Below is a list of status codes this API may return:
 *            1. **201** - OK
 *            2. **400** - Bad user request
 *            3. **404** - Not found
 *            4. **500** - Internal server error
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
 *                  description: Not found.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *
 */
const signUpEndpoint = async (req, res) => {
  try {
    // let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

    // if (!regex.test(req.body.email)) {
    //   const error = new Error('Not a valid email')
    //   error.name = 'ValidationError'
    //   throw error
    // }

    // const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    if (!req.body.password) {
      const error = new Error('Internal server error')
      throw error
    }

    const user = await User.create({ ...req.body })

    if (!user) {
      throw Error('User is not found')
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
 *          description: |
 *            This endpoint logs the user in using their username and password and **returns a token** This token must be used in the **Authorize button** in the **top right of the screen**.
 *
 *            ### Below is a list of status codes this API may return:
 *            1. **201** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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

const signInEndpoint = async (req, res) => {
  try {
    // first, extract the req payload
    const username = req.body.username
    const password = req.body.password

    // second, validate if user indeed exists
    const user = await User.findOne({ username: username }).select('password')
    if (!user) throw Error("We don't know this user. Try to sign up.")

    // third, check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error('Password is incorrect')

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
 *          description: |
 *            This endpoint signs a user out and **returns success**.
 *
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **400** - Bad user request
 *            3. **500** - Internal server error
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
const signOutEndpoint = async (req, res) => {
  try {
    // Extract the auth header
    const authHeader = req.headers.authorization
    if (!authHeader) throw Error('Your request needs authentication')

    // Extract token
    const [authMethod, token] = authHeader.split(' ')
    if (authMethod !== 'Bearer') throw Error('Invalid authentication method')

    if (!token) throw Error('Invalid authentication method')

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
 *          description: |
 *            This endpoint looks for the information of the signed in user and **returns the found user**.
 *
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              404:
 *                  description: Not found.
 *          tags:
 *              - User
 *
 */
const meEndpoint = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw Error('Your request needs to be authenticated')
    }

    const [authMethod, token] = authHeader.split(' ')

    if (authMethod !== 'Bearer') {
      throw Error('Invalid authentication method')
    }

    if (!token) {
      throw Error('Invalid authentication method')
    }

    let decoded

    try {
      decoded = jwt.verify(token, PRIVATE_KEY)
    } catch (err) {
      throw Error('You are not authenticated')
    }

    const dbUser = await User.findOne({ _id: decoded.id }).select('-password')

    if (!dbUser) {
      throw Error("We don't know this user. Try to sign up.")
    }

    res.status(OK).json({ success: true, data: dbUser })
  } catch (err) {
    res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
  }
}

/**
 * @openapi
 * /api/me:
 *      put:
 *          description: |
 *            This endpoint edits the details of the currently signed in user and **returns the edited user**.
 *
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
 *          security:
 *              -   bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              404:
 *                  description: Not found.
 *          tags:
 *              - User
 *
 */
const editUserEndpoint = async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw Error('Your request needs to be authenticated')
    }

    const [authMethod, token] = authHeader.split(' ')

    if (authMethod !== 'Bearer') {
      throw Error('Invalid authentication method')
    }

    if (!token) {
      throw Error('Invalid authentication method')
    }

    let decoded

    try {
      decoded = jwt.verify(token, PRIVATE_KEY)
    } catch (err) {
      throw Error('You are not authenticated')
    }

    const data = await User.findByIdAndUpdate(
      decoded.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).select('-password')

    res.status(OK).json({ success: true, data: data })
  } catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
  }
}

module.exports = {
  signUpEndpoint,
  signInEndpoint,
  signOutEndpoint,
  meEndpoint,
  editUserEndpoint,
}
