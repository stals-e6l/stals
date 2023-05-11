const jwt = require("jsonwebtoken");

const { ERRORS } = require("./error_handler")
const { ErrorHandler } = require("./error_handler")

const PRIVATE_KEY = process.env.PRIVATE_KEY

const authGuard = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            var error = new Error();
            error.name = "AuthError";
            throw error;
        }
    
        const [authMethod, token] = authHeader.split(' ')
    
        if (authMethod !== 'Bearer') {
            var error = new Error();
            error.name = "AuthError";
            throw error;
        }
    
        if (!token) {
            var error = new Error();
            error.name = "AuthError";
            throw error;
        }
    
        const decoded = jwt.verify(token, PRIVATE_KEY)
        const dbUser = await User.findById(decoded.id)
    
        if (!dbUser) {
            var error = new Error();
            error.name = "AuthError";
            throw error;
        }

        req.user = dbUser
        next();

    } catch (err) {
        let code = ErrorHandler(err.name);

        res.status(code).json({success: false, messages: [ERRORS[code]]});
    }
}
