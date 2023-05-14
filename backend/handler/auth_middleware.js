const jwt = require("jsonwebtoken");

const { ERRORS, UNAUTHORIZED } = require('./error_handler')
const User = require('../models/v2/user')

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            throw Error("Header does not exist.")
        }

        const [authMethod, token] = authHeader.split(' ')
    
        if (authMethod !== 'Bearer') {
            throw Error("Auth method is not bearer.")
        }

        if (!token) {
            throw Error("Token does not exist.")
        }

        let decoded;

        try {
          decoded = jwt.verify(token, PRIVATE_KEY)
        } catch(err) {
          throw Error("Docoding failed.")
        }
        const dbUser = await User.findById(decoded.id)
    
        if (!dbUser) {
            throw Error("User does not exist")
        }
        req.user = dbUser
        next();

    } catch (err){
        res.status(UNAUTHORIZED).json({ success: false, messages: [String(err)] })
    }
}

module.exports = { authGuard };