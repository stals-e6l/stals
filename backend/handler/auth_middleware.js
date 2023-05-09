const jwt = require("jsonwebtoken");

const authMid = router();

authMid('*', async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
        }
    
        const [authMethod, token] = authHeader.split(' ')
    
        if (authMethod !== 'Bearer') {
        }
    
        if (!token) {
        }
    
        const decoded = jwt.verify(token, PRIVATE_KEY)
        const dbUser = await User.findById(decoded.id)
    
        if (!dbUser) {
        }
    
    } catch (err) {
    
    }
})