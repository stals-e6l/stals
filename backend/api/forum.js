const { Router } = require('express')

var Forum = require("../models/forum");

const forumRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Forum:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Forum name
 */

/**
 * @openapi
 * /api/forum:
 *      post:
 *          description: Adds accommodation
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
 *              404:
 *                  description: The accommodation was not created
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              
 */
forumRouter.post("/", async function(req, res){
    try{
        const savedAccom = await Forum.create({ ...req.body });
        if(!savedAccom){
            throw new Error(400);
        }else{
            res.status(201).json({ status: true, data: savedAccom });
        }
    } catch(err){
        switch(err) {
            case 404:
                res.status(404).json({ status: false, messages: ["Error: Not found"]});
            case 400:
                res.status(400).json({ status: false, messages: ["Error: Bad request"]});
              break;
            case 401:
                res.status(401).json({ status: false, messages: ["Error: Unauthorized access"]});
              break;
            case 500:
                res.status(500).json({ status: false, messages: ["Error: Internal server error"]});
              break;
            default:
                res.json({success: false, messages: [String(err)]});
        }
    }
})

/**
 * @openapi
 * /api/forum/{id}:
 *      get:
 *          description: Get accommodation by id
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
 *                  description: Not found
 *              
 */
forumRouter.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const accom = await Forum.findById(req.params.id);
        if(!accom){
            throw 404;
        }
        res.status(200).json({success: true, data: accom});
    } catch(err){
        switch(err) {
            case 404:
                res.status(404).json({ status: false, messages: ["Error: Not found"]});
                break;
            case 400:
                res.status(400).json({ status: false, messages: ["Error: Bad request"]});
              break;
            case 401:
                res.status(401).json({ status: false, messages: ["Error: Unauthorized access"]});
              break;
            case 500:
                res.status(500).json({ status: false, messages: ["Error: Internal server error"]});
              break;
            default:
                res.json({success: false, messages: [String(err)]});
        }
    }
})

/**
 * @openapi
 * /api/forum:
 *      get:
 *          description: Get all accommodations
 *          parameters:
 *              -   in: query
 *                  name: name
 *                  schema:
 *                      type: string
 *                  description: The name of accommodation
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
 *              
 *              
 */
forumRouter.get('/', async function(req, res){
    try{
        let query = {...req.query}
        delete query["limit"];  //delete every query that's not part of the database model

        const limit = Number(req.query.limit) || 100;
        const accommodations = await Forum.find(query).limit(limit);
        
        res.status(200).json({success:true, data:accommodations});
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
 *          description: Delete accommodation by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Accommodation was deleted
 *              404:
 *                  description: The accommodation was not found
 *              500:
 *                  description: Internal server error
 *              
 */
forumRouter.delete('/:id', async function(req, res){
    try{
        const removedAccom = await Forum.findByIdAndRemove({_id: req.params.id});
        
        if (!removedAccom) {
            throw new Error("404");
        } else {
            res.status(200).json({success: true, data: null});
        }
        // TODO: Handle other errors (authentication)
    } catch(err){
        if (String(err).includes("404")) {
            res.status(404).json({success: false, messages: ["Error 404: Accommodation not found"]});
        } else {
            res.status(500).json({success: false, messages: ["Error 500: Internal server error", err]});
        }
    }
});

/**
 * @openapi
 * /api/forum/{id}:
 *      put:
 *          description: Edit accommodation by id
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
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              
 */
forumRouter.put('/:id', async function(req, res){
    try{
        const editedAccom = await Forum.findOneAndUpdate(
            {_id: req.params.id},
            { ...req.body},
            {new: true});

        if(!editedAccom){
            throw 404;
        }
        
        if(!['unfurnished', 'semifurnished', 'fully_furnished'].includes(editedAccom.furnishing)){
            throw 400;
        }
        
        if(!['hotel', 'apartment', 'bedspace', 'dormitory', 'transient'].includes(editedAccom.type)){
            throw 400;
        }
        res.status(200).json({ success: true, data: editedAccom })
    } catch(err){
        switch(err) {
            case 404:
                res.status(404).json({ status: false, messages: ["Error: Not found"]});
                break;
            case 400:
                res.status(400).json({ status: false, messages: ["Error: Bad request"]});
              break;
            case 401:
                res.status(401).json({ status: false, messages: ["Error: Unauthorized access"]});
              break;
            case 500:
                res.status(500).json({ status: false, messages: ["Error: Internal server error"]});
              break;
            default:
                res.json({success: false, messages: [String(err)]});
        }
    }

});

module.exports = forumRouter;
