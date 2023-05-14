const jwt = require("jsonwebtoken");

const { ERRORS, UNAUTHORIZED } = require('./error_handler')
const User = require('../models/v2/user')

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            throw Error(ERRORS[UNAUTHORIZED])
        }

        const [authMethod, token] = authHeader.split(' ')
    
        if (authMethod !== 'Bearer') {
            throw Error(ERRORS[UNAUTHORIZED])
        }

        if (!token) {
            throw Error(ERRORS[UNAUTHORIZED])
        }

        const decoded = jwt.verify(token, PRIVATE_KEY)
        const dbUser = await User.findById(decoded.id)
    
        if (!dbUser) {
            throw Error(ERRORS[UNAUTHORIZED])
        }
        req.user = dbUser
        next();

    } catch (err){
        res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
    }
}

module.exports = { authGuard };