const { Router } = require('express')

var Forum = require("../models/forum");
var Accommodation = require("../models/accommodation");

const forumRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Forum:
 *          type: object
 *          required:
 *              - content
 *              - status
 *              - is_public
 *              - accommodation_id
 *          properties:
 *              content:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Array of comments/chats of users
 *              status:
 *                  type: string
 *                  pattern: '^((active)|(archived)|(deleted))$'
 *                  description: Status of the forum/chat conversation
 *              is_public:
 *                  type: boolean
 *                  description: Either public forum or private chat
 *              accommodation_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation reference
 */

/**
 * @openapi
 * /api/forum:
 *      post:
 *          description: Create forum
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Forum'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Forum'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (for accommodation id).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Forum
 *              
 */
forumRouter.post("/", async function(req, res){
    try {
        // TODO: Check if user is authenticated
        // if (user is not authenticated){
        //     const error = new Error("Permission denied");
        //     error.name = "AuthError";
        //     throw error;
        // }

        // Check if accommodation exists
        const refAccom = await Accommodation.findById(req.body.accommodation_id);
        if (!refAccom) {
            const error = new Error("Accommodation does not exist");
            error.name = "NullError";
            throw error;
        }

        const savedForum = await Forum.create({ ...req.body });

        res.status(201).json({ success: true, data: savedForum });

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
 * /api/forum/{id}:
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
 *                              $ref: '#/components/schemas/Forum'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              404:
 *                  description: Forum could not be found
 *          tags:
 *              - Forum
 *              
 */
forumRouter.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const forum = await Forum.findById(req.params.id);
        if(!forum){
            const error = new Error("Accomodation does not exist");
            error.name = "NullError";
            throw error;
        }
        res.status(200).json({success: true, data: forum});
    } catch(err){
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
 * /api/forum:
 *      get:
 *          description: Get all forums
 *          parameters:
 *              -   in: query
 *                  name: name
 *                  schema:
 *                      type: string
 *                  description: The name of forum
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Forum'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *          tags:
 *              - Forum
 *              
 *              
 */
forumRouter.get('/', async function(req, res){
    try{
        let query = {...req.query}
        delete query["limit"];  //delete every query that's not part of the database model

        const limit = Number(req.query.limit) || 100;
        const forums = await Forum.find(query).limit(limit);
        
        res.status(200).json({success:true, data:forums});
    } catch(err){
        switch(err){
            case 400:
                res.status(400).json({success:false, messages: ["Error: Bad request"]});
                break;
            case 401:
                res.status(401).json({success:false, messages: ["Error: Unauthorized access"]});
                break;
            case 500:
                res.status(500).json({success:false, messages: ["Error: Internal service error"]});
                break;
            default:
                res.json({success:false, messages: [err]});
        }
    }
});

/**
 * @openapi
 * /api/forum/{id}:
 *      delete:
 *          description: Delete forum by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Forum was deleted
 *              404:
 *                  description: The forum was not found
 *              500:
 *                  description: Internal server error
 *          tags:
 *              - Forum
 *              
 */
forumRouter.delete('/:id', async function(req, res){
    try{
        const removedForum = await Forum.findByIdAndRemove({_id: req.params.id});
        
        if (!removedForum) {
            const error= new Error("Forum does not exist");
            error.name="NullError";
            throw error;
        } else {
            res.status(200).json({success: true, data: null});
        }
        
    } catch(err){
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
});

/**
 * @openapi
 * /api/forum/{id}:
 *      put:
 *          description: Edit forum by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Forum'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Forum'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (For accommodation and forum).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Forum
 *              
 */
forumRouter.put('/:id', async function(req, res){
    try{

        const refAccom = await Accommodation.findById(req.body.accommodation_id);
        if (!refAccom) {
            const error = new Error("Accommodation does not exist");
            error.name = "NullError";
            throw error;
        }

        if(!['active', 'archived', 'deleted'].includes(req.body.status)){
            const error = new Error("Status is incorrect");
            error.name = "ValidationError";
            throw error;
        }

        const editedForum = await Forum.findOneAndUpdate(
            {_id: req.params.id},
            { ...req.body},
            {new: true});

        if(!editedForum){
            const error = new Error("Forum does not exist");
            error.name = "NullError";
            throw error;
        }

        res.status(200).json({ success: true, data: editedForum })

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
            case "NullError":
                code = 404;
                break;
            default:
                code = 500;
        }

        res.status(code).json({success: false, messages: [String(err)]});
    }

});

module.exports = forumRouter;
