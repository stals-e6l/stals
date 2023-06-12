const jwt = require('jsonwebtoken')

const { ERRORS, UNAUTHORIZED } = require('./error_handler')
const User = require('../models/v3/user')

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async (req, res, next) => {
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
    const dbUser = await User.findById(decoded.id)

    if (!dbUser) {
      throw Error("We don't know this user. Try to sign up.")
    }
    req.user = dbUser
    next()
  } catch (err) {
    res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
  }
}

module.exports = { authGuard }
