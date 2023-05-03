const { Router } = require('express')

const Report = require("../models/report");
const User = require("../models/user")

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
            error.name = "ValidationError";
            throw error;
        }

        const savedReport = await Report.create({ ...req.body });

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
 *          description: Get report by id
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
            const error = new Error("Report does not exist");
            error.name = "NullError";
            throw error;
        }
        const report= await Report.findById(req.params.id);
        if(!report){
            const error = new Error("Report does not exist");
            error.name = "NullError";
            throw error;
        }
        res.status(200).json({success: true, data: report});
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
 * /api/report:
 *      get:
 *          description: Get all reports
 *          parameters:
 *              -   in: query
 *                  name: user_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User that generated the report
 *              -   in: query
 *                  name: pdf_url
 *                  schema:
 *                      type: string
 *                  description: URL of the PDF generated
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
 *          description: Delete report by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Report was deleted
 *              404:
 *                  description: The report was not found
 *              500:
 *                  description: Internal server error
 *          tags:
 *              - Report
 *              
 */
reportRouter.delete('/:id', async function(req, res){
    try{
        const removedReport = await Report.findByIdAndRemove({_id: req.params.id});
        
        if (!removedReport) {
            const error = new Error("Report does not exist");
            error.name = "NullError";
            throw error;
        } else {
            res.status(200).json({success: true, data: null});
        }
        
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
