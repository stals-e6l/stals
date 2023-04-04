const { Router } = require('express')
const Accommodation = require("../models/accommodation");

const accommodationRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Accommodation:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Accommodation name
 */

/**
 * @openapi
 * /api/accomodation:
 *      post:
 *          description: Adds accommodation
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Accommodation'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accommodation'
 *              404:
 *                  description: The accommodation was not created
 *              
 */
accommodationRouter.post("/", async function(req, res){
    var accom = new Accommodation({
        name: req.body.name
    });

    try{
        var savedAccom = await accom.save();
        res.send(savedAccom);
    } catch(err){
        res.send({message: err})
    }  
});

/**
 * @openapi
 * /api/accomodation/{id}:
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
 *                              $ref: '#/components/schemas/Accommodation'
 *              404:
 *                  description: The accommodation could not be found
 *              
 */
accommodationRouter.get('/:accommodationId', async function(req, res){
    try{
        var accom = await Accommodation.findById(req.params.accommodationId);
        res.send(accom);
    } catch(err){
        res.send({message: err});
    }
    
});

/**
 * @openapi
 * /api/accomodation:
 *      get:
 *          description: Get all accommodations
 * 
 * 
 * 
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Accommodation'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *              
 *              
 */
accommodationRouter.get('/', async function(req, res){
    try{
        const accommodations = await Accommodation.find(); 
        res.json({success:true,data:accommodations});
    } catch(err){
        switch(err){
            case 400:
                res.send({success:false,message:"Error: Bad request"});  
                break;
            case 401:
                res.send({success:false,message:"Error Unauthorized access"});
                break;
            case 500:
                res.send({success:false,message:"Error Internal service error"});
                break;
            default:
                res.send({success:false,message:err});
        }
    }
});

/**
 * @openapi
 * /api/accomodationId/{id}:
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
 *              
 */
accommodationRouter.delete('/:accommodationId', async function(req, res){
    try{
        var removedAccom = await Accommodation.deleteOne({_id: req.params.accommodationId});
        res.send(removedAccom);
    } catch(err){
        res.send({message: err});
    }

});

/**
 * @openapi
 * /api/accomodation/{id}:
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
 *                          $ref: '#/components/schemas/Accommodation'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accommodation'
 *              404:
 *                  description: The accommodation could not be found
 *              
 */
accommodationRouter.put('/:accommodationId', async function(req, res){
    try{
        var editedAccom = await Accommodation.updateOne(
            {_id: req.params.accommodationId},
            {$set: {name: req.body.name}});
        res.send(editedAccom);
    } catch(err){
        res.send({message: err});
    }

});

module.exports = accommodationRouter
