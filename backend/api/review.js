const { Router } = require('express')

var Review = require("../models/review");
var Accommodation = require("../models/accommodation");

const reviewRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Review:
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
 *                  description: Status of the review/chat conversation
 *              is_public:
 *                  type: boolean
 *                  description: Either public review or private chat
 *              accommodation_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation reference
 */

/**
 * @openapi
 * /api/review:
 *      post:
 *          description: Create review
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Review'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (for accommodation id).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Review
 *              
 */
reviewRouter.post("/", async function(req, res){
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

        const savedReview = await Review.create({ ...req.body });

        res.status(201).json({ success: true, data: savedReview });

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
 * /api/review/{id}:
 *      get:
 *          description: Get review by id
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
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              404:
 *                  description: Review could not be found
 *          tags:
 *              - Review
 *              
 */
reviewRouter.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const review = await Review.findById(req.params.id);
        if(!review){
            const error = new Error("Review does not exist");
            error.name = "NullError";
            throw error;
        }
        res.status(200).json({success: true, data: review});
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
 * /api/review:
 *      get:
 *          description: Get all reviews
 *          parameters:
 *              -   in: query
 *                  name: content
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The collection of comments of a user in the review
 *              -   in: query
 *                  name: status
 *                  schema:
 *                      type: string
 *                      enum: ["active", "archived", "deleted"]
 *                  description: The status of the Review
 *              -   in: query
 *                  name: is_public
 *                  schema:
 *                      type: boolean
 *                  description: Type of Review either public or private.
 *              -   in: query
 *                  name: accommodation_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation reference
 *              -   in: query
 *                  name: limit
 *                  schema:
 *                      type: number
 *                  description: Number of reviews to return
 * 
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *          tags:
 *              - Review
 *              
 *              
 */
reviewRouter.get('/', async function(req, res){
    try{
        let query = {...req.query}
        delete query["limit"];  //delete every query that's not part of the database model
        
        const limit = Number(req.query.limit) || 100;
        const reviews = await Review.find(query).limit(limit);
        
        res.status(200).json({success:true, data:reviews});
    } catch(err){
        let code;
        switch(err.name){
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
 * /api/review/{id}:
 *      delete:
 *          description: Delete review by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Review was deleted
 *              404:
 *                  description: The review was not found
 *              500:
 *                  description: Internal server error
 *          tags:
 *              - Review
 *              
 */
reviewRouter.delete('/:id', async function(req, res){
    try{
        const removedReview = await Review.findByIdAndRemove({_id: req.params.id});
        
        if (!removedReview) {
            const error= new Error("Review does not exist");
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
 * /api/review/{id}:
 *      put:
 *          description: Edit review by id
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
 *                          $ref: '#/components/schemas/Review'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (For accommodation and review).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Review
 *              
 */
reviewRouter.put('/:id', async function(req, res){
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

        const editedReview = await Review.findOneAndUpdate(
            {_id: req.params.id},
            { ...req.body},
            {new: true});

        if(!editedReview){
            const error = new Error("Review does not exist");
            error.name = "NullError";
            throw error;
        }

        res.status(200).json({ success: true, data: editedReview })

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

module.exports = reviewRouter;
