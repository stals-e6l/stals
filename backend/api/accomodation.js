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
 *              - address
 *              - type
 *              - price
 *              - size_sqm
 *              - meters_from_uplb
 *              - landmarks
 *              - min_pax
 *              - max_pax
 *              - num_rooms
 *              - num_beds
 *              - num_views
 *              - furnishing
 *              - cooking_rules
 *              - pet_rules
 *              - other_rules
 *              - safety_and_security
 *              - appliances
 *              - amenities
 *              - is_soft_deleted
 *          properties:
 *              name:
 *                  type: string
 *                  description: Accommodation name
 *              address:
 *                  type: string
 *                  description: Accommodation address
 *              type:
 *                  type: string
 *                  description: Accommodation type
 *              price:
 *                  type: number
 *                  description: Accommodation price
 *              size_sqm:
 *                  type: number
 *                  description: Accommodation size in square meters
 *              meters_from_uplb:
 *                  type: number
 *                  description: Accommodation distance from uplb in meters
 *              landmarks:
 *                  type: array
 *                  items: 
 *                      type: string
 *                  description: Accommodation nearest landmarks
 *              min_pax:
 *                  type: number
 *                  description: Accommodation minimum occupants
 *              max_pax:
 *                  type: number
 *                  description: Accommodation maximum occupants
 *              num_rooms:
 *                  type: number
 *                  description: Accommodation number of rooms
 *              num_beds:
 *                  type: number
 *                  description: Accommodation number of beds
 *              num_views:
 *                  type: number
 *                  description: Accommodation number of views
 *              furnishing:
 *                  type: string
 *                  description: Accommodation type of furnishing
 *              cooking_rules:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation cooking rules
 *              pet_rules:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation pet rules
 *              other_rules:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation other_rules
 *              safety_and_security:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation safety and security  
 *                  
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
