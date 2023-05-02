const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/user");

const authRouter = Router()

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const saltRounds = 10;
let blacklist = {};

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              userName:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
 *              email:
 *                  type: string
 *                  description: Email of user
 * 
 *      Login:
 *          type: object
 *          required:
 *              - userName
 *              - password
 *          properties:
 *              userName:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
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
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *              
 */
authRouter.post("/sign-up", async function(req, res){
    try {
        if(!req.body.password){
            throw 404;
        }

        if(!req.body.userName){
            throw 404;
        }

        if(!req.body.email){
            throw 404;
        }

        bcrypt.hash(req.body.password, saltRounds, function(err, hashedPass){
            if(err){
                throw 500;
            }

            let user = new User({
                userName: req.body.userName,
                password: hashedPass,
                email: req.body.email,
            });
    
            user.save()
                .then(user => {
                    res.status(201).json({ success: true, data: user });
                })
        })
    } catch(err) {
        let code;

        switch (err.name) {
            case "ValidationError":
                code = 400;
                break;
            case "CastError":
                code = 400;
                break;
            case "NullError":
                code = 404;
                break;
            default:
                code = 500;
        }

        res.status(code).json({success: false, messages: [String(err)]});
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
authRouter.post("/sign-in", async function(req, res){
    try {
        // first, extract the req payload
        const userName = req.body.userName;
        const password = req.body.password;

        // second, validate if user indeed exists
        const user = await User.findOne({ userName: userName });
        if(!user) throw new Error("No User Found")

        // third, check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error("Wrong password")
        
        // fourth, generate token
        const token = jwt.sign({id: user.id, userName: user.userName, type: user.type});
        
        // fifth, remove token in blacklist if existing
        if(blacklist[token]) delete blacklist[token];

        // last, return success
        res.status(200).json({ success: true, token: token});


    } catch(err) {
        let code;

        switch (err.name) {
            case "ValidationError":
                code = 400;
                break;
            case "CastError":
                code = 400;
                break;
            case "NullError":
                code = 404;
                break;
            default:
                code = 500;
        }

        res.status(code).json({success: false, messages: [String(err)]});
    }
})

/**
 * @openapi
 * /api/sign-out:
 *      post:
 *          description: Sign out
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
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *              
 */
authRouter.post("/sign-out", async function(req, res){
    try {
        //insert sign out here
    } catch(err) {
        let code;

        switch (err.name) {
            case "ValidationError":
                code = 400;
                break;
            case "CastError":
                code = 400;
                break;
            case "NullError":
                code = 404;
                break;
            default:
                code = 500;
        }

        res.status(code).json({success: false, messages: [String(err)]});
    }
})

/**
 * @openapi
 * /api/me:
 *      get:
 *          description: Get forum by id
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              404:
 *                  description: Not found
 *          tags:
 *              - User
 *              
 */
authRouter.get('/me', async function(req, res){
    try{
        //insert me here
    } catch(err) {
        let code;

        switch (err.name) {
            case "ValidationError":
                code = 400;
                break;
            case "CastError":
                code = 400;
                break;
            case "AuthError":
                code = 401;
                break;
            case "NullError":
                code = 404;
                break;
            default:
                code = 500;
        }

        res.status(code).json({success: false, messages: [String(err)]});
    }
})

module.exports = authRouter;
