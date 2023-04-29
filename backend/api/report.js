const { Router } = require('express')

var Report = require("../models/report");
var User = require("../models/user")

const reportRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Report:
 *          type: object
 *          required:
 *              - user_id
 *              - pdf_url
 *          properties:
 *              user_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User id that created report
 *              pdf_url:
 *                  type: string
 *                  description: URL of pdf
 */

/**
 * @openapi
 * /api/report:
 *      post:
 *          description: Create report
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Report'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *              
 */
reportRouter.post("/", async function(req, res){
    try {
        const savedReport = await Report.create({ ...req.body });

        const refUser = await User.findById(req.body.user_id)

        if(!refUser){
            const error = new Error("User does not exist");
            error.name = "NullError";
            throw error;
        }
        
        try{
            const pdf_url = new URL(req.body.pdf_url);
        } catch(err){
            const error = new Error("URL does not exist");
            error.name = "TypeError";
            throw error;
        }

        res.status(201).json({ success: true, data: savedReport });

    } catch(err) {
        let code;

        switch (err.name) {
            case "ValidationError":
                code = 400;
                break;
            case "CastError":
                code = 400;
                break;
            case "TypeError":
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
 * /api/report/{id}:
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
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              404:
 *                  description: Not found
 *          tags:
 *              - Report
 *              
 */
reportRouter.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const forum = await Report.findById(req.params.id);
        if(!forum){
            throw 404;
        }
        res.status(200).json({success: true, data: forum});
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
 * /api/report:
 *      get:
 *          description: Get all reports
 *          parameters:
 *              -   in: query
 *                  name: name
 *                  schema:
 *                      type: string
 *                  description: The name of report
 *              -   in: query
 *                  name: limit
 *                  schema:
 *                      type: number
 *                  description: Number of reports to return
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *          tags:
 *              - Report
 *              
 *              
 */
reportRouter.get('/', async function(req, res){
    try{
        let query = {...req.query}
        delete query["limit"];  //delete every query that's not part of the database model

        const limit = Number(req.query.limit) || 100;
        const forums = await Report.find(query).limit(limit);
        
        res.status(200).json({success:true, data:forums});
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
});

/**
 * @openapi
 * /api/report/{id}:
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
 *              - Report
 *              
 */
reportRouter.delete('/:id', async function(req, res){
    try{
        const removedForum = await Report.findByIdAndRemove({_id: req.params.id});
        
        if (!removedForum) {
            throw new Error("404");
        } else {
            res.status(200).json({success: true, data: null});
        }
        // TODO: Handle other errors (authentication)
    } catch(err){
        if (String(err).includes("404")) {
            res.status(404).json({success: false, messages: ["Error 404: Forum not found"]});
        } else {
            res.status(500).json({success: false, messages: ["Error 500: Internal server error", err]});
        }
    }
});

/**
 * @openapi
 * /api/report/{id}:
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
 *                          $ref: '#/components/schemas/Report'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (For accommodation and forum).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *              
 */
reportRouter.put('/:id', async function(req, res){
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

        const editedForum = await Report.findOneAndUpdate(
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

module.exports = reportRouter;
