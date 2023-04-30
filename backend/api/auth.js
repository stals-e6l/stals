const { Router } = require('express')
const bcrypt = require('bcryptjs')

const User = require("../models/user");

const authRouter = Router()

const saltRounds = 10;

/**
 * @openapi
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - password
 *              - email
 *              - role
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username of user
 *              password:
 *                  type: string
 *                  description: Password of user
 *              email:
 *                  type: string
 *                  description: Email of user
 *              role:
 *                  type: string
 *                  pattern: '^((admin)|(owner)|(tenant))$'
 *                  description: Role of the user
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
 *              404:
 *                  description: Null Error
 *              422:
 *                  description: Unprocessable Entity
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - User
 *              
 */
authRouter.post("/", async function(req, res){
    try {

        const existingUser= await User.findOne({email: req.body.email});
        if(existingUser){
            console.log(existingUser)
            res.status(422).json({success:false, message: "Email already Taken"});
        }
        
        if(!req.body.password){
            throw 404;
        }

        if(!req.body.username){
            throw 404;
        }

        if(!req.body.email){
            throw 404;
        }
        if(!req.body.role){
            throw 404;
        }

        bcrypt.hash(req.body.password, saltRounds, function(err, hashedPass){
            if(err){
                throw 500;
            }

            let user = new User({
                username: req.body.username,
                password: hashedPass,
                email: req.body.email,
                role: req.body.role
            });
    
            user.save()
                .then(user => {
                    res.status(201).json({ success: true, data: user});
                })
        })
    } catch(err) {
        let code;
        console.log(err.name)

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
            case "UnprocessableContent":
                code= 422;
                break;
            default:
                code = 500;
        }
        console.log(err)

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
