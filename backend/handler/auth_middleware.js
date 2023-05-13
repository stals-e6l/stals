const jwt = require("jsonwebtoken");

const { ERRORS, UNAUTHORIZED } = require('./error_handler')
const User = require('../models/v2/user')

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader)
    
        if (!authHeader) {
            throw UNAUTHORIZED;
        }

        const [authMethod, token] = authHeader.split(' ')
        console.log(authMethod)
        console.log(token)
    
        if (authMethod !== 'Bearer') {
            throw UNAUTHORIZED;
        }

        if (!token) {
            throw UNAUTHORIZED;
        }

        const decoded = jwt.verify(token, PRIVATE_KEY)
        const dbUser = await User.findById(decoded.id)
        console.log(dbUser)
    
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