const { Router } = require('express')
const bcrypt = require('bcrypt')
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
 *              name:
 *                  type: string
 *                  description: Name of user
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
authRouter.post("/", async function(req, res){
    try {
        const savedUser = await User.create({ ...req.body });

        res.status(201).json({ success: true, data: savedUser });

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
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *              
 */
authRouter.post("/", async function(req, res){
    try {
        //insert sign in here

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
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Authentication error.
 *              404:
 *                  description: Null error.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *              
 */
authRouter.get('/', async function(req, res){
    try{

        // Extract the auth header
        const authHeader = req.headers["Authorization"]
        if(!authHeader) throw new Error("No auth header!")

        // Extract token
        const [authMethod, token] = authHeader.split(" ")
        if(authMethod !== "Bearer") throw new Error("Auth method should be \"Bearer\"!")
        if(!token) throw new Error("No token!")
        
        // Add token to blacklist
        if(!blacklist[token]) blacklist[token] = token;
        
        res.status(200).json({ success: true, messages: ['Success'] });

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


/**
 * @openapi
 * /api/me:
 *      get:
 *          description: Get forum by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
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
authRouter.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const forum = await User.findById(req.params.id);
        if(!forum){
            throw 404;
        }
        res.status(200).json({success: true, data: forum});
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
