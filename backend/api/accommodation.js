const { Router } = require('express')
var Accommodation = require("../models/accommodation");

const accom = Router()

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
 * /api/accommodation:
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
accom.post("/", async function(req, res){
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
 * /api/accommodation/{id}:
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

accom.get('/:id', async function(req, res){
    try{
        if(!req.params.id){
            throw 400;
        }
        const accom = await Accommodation.findById(req.params.id);
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
    
});

/**
 * @openapi
 * /api/accommodation:
 *      get:
 *          description: Get all accommodations
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Accommodation'
 *              404:
 *                  description: The accommodation could not be found
 *              
 */
accom.get('/', async function(req, res){
    try{
        var accoms = await Accommodation.find();
        res.send(accoms);
    } catch(err){
        res.send({message: err});
    }
});

/**
 * @openapi
 * /api/accommodationId/{id}:
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
accom.delete('/:accommodationId', async function(req, res){
    try{
        var removedAccom = await Accommodation.deleteOne({_id: req.params.accommodationId});
        res.send(removedAccom);
    } catch(err){
        res.send({message: err});
    }

});

/**
 * @openapi
 * /api/accommodation/{id}:
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
accom.put('/:accommodationId', async function(req, res){
    try{
        var editedAccom = await Accommodation.updateOne(
            {_id: req.params.accommodationId},
            {$set: {name: req.body.name}});
        res.send(editedAccom);
    } catch(err){
        res.send({message: err});
    }

});

module.exports = accom
