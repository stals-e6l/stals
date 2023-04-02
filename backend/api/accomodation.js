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
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Accomodation'
 *              404:
 *                  description: The accomodation could not be found
 *              
 */
accom.get('/', async function(req, res){
    try{
        var accoms = await Accomodation.find();
        res.send(accoms);
    } catch(err){
        res.send({message: err});
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
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              
 */
accom.put('/:id', async function(req, res){
    try{
        const editedAccom = await Accomodation.updateOne(   //cannot change to Accommodation.findByIdAndUpdate(), won't update accommodation
            {_id: req.params.id},
            {$set: {name: req.body.name}});
        res.json(editedAccom);
    } catch(err){
        switch(err){
            case 400:
                res.json({success: false, message: "Error: Bad request"});
            case 401:
                res.json({success: false, message: "Error: Unauthorized access"});
            case 500:
                res.json({success: false, message: "Error: Internal server error"});
            default:
                res.json({success: false, message: err});
        }
    }

});

module.exports = accom
