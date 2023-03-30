const { Router } = require('express')
var Accomodation = require("../models/accommodation");

const accom = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Accomodation:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Accomodation name
 */

/**
 * @openapi
 * /api/accomodation:
 *      post:
 *          description: Adds accomodation
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Accomodation'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accomodation'
 *              404:
 *                  description: The accomodation was not created
 *              
 */
accom.post("/", async function(req, res){
    var accom = new Accomodation({
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
 *          description: Get accomodation by id
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
 *                              $ref: '#/components/schemas/Accomodation'
 *              404:
 *                  description: The accomodation could not be found
 *              
 */
accom.get('/:accomodationId', async function(req, res){
    try{
        var accom = await Accomodation.findById(req.params.accomodationId);
        res.send(accom);
    } catch(err){
        res.send({message: err});
    }
    
});

/**
 * @openapi
 * /api/accomodation:
 *      get:
 *          description: Get all accomodations
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
 *                                  $ref: '#/components/schemas/Accomodation'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *              
 *              
 */
accom.get('/', async function(req, res){
    try{
        var accoms = await Accomodation.find(); 
        res.json({success:true,data:accoms});
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
 *          description: Delete accomodation by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  schema:
 *                      type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Accomodation was deleted
 *              404:
 *                  description: The accomodation was not found
 *              
 */
accom.delete('/:accomodationId', async function(req, res){
    try{
        var removedAccom = await Accomodation.deleteOne({_id: req.params.accomodationId});
        res.send(removedAccom);
    } catch(err){
        res.send({message: err});
    }

});

/**
 * @openapi
 * /api/accomodation/{id}:
 *      put:
 *          description: Edit accomodation by id
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
 *                          $ref: '#/components/schemas/Accomodation'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accomodation'
 *              404:
 *                  description: The accomodation could not be found
 *              
 */
accom.put('/:accomodationId', async function(req, res){
    try{
        var editedAccom = await Accomodation.updateOne(
            {_id: req.params.accomodationId},
            {$set: {name: req.body.name}});
        res.send(editedAccom);
    } catch(err){
        res.send({message: err});
    }

});

module.exports = accom
