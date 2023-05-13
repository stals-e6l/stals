const jwt = require("jsonwebtoken");

const { ERRORS, UNAUTHORIZED } = require('./error_handler')
const User = require('../models/v2/user')

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            throw UNAUTHORIZED;
        }

        const [authMethod, token] = authHeader.split(' ')
    
        if (authMethod !== 'Bearer') {
            throw UNAUTHORIZED;
        }

        if (!token) {
            throw UNAUTHORIZED;
        }

        const decoded = jwt.verify(token, PRIVATE_KEY)
        const dbUser = await User.findById(decoded.id)
    
        if (!dbUser) {
            throw UNAUTHORIZED;
        }
        req.user = dbUser
        next();

    } catch (err){
        res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
}

module.exports = { authGuard };