const { Router } = require('express')
var Accommodation = require("../models/accommodation");

const accommodationRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *      Accommodation:
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
 *              appliances:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation appliances
 *              amenities:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation ammenities
 *              is_soft_deleted:
 *                  type: boolean
 *                  description: Accommodation is soft deleted
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
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              
 */
accommodationRouter.post("/", async function(req, res){
    try{
        const savedAccom = await Accommodation.create({ ...req.body });
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
accommodationRouter.get('/:id', async function(req, res){
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
accommodationRouter.get('/', async function(req, res){
    try{
        var accoms = await Accommodation.find();
        res.send(accoms);
    } catch(err){
        res.send({message: err});
    }
});

/**
 * @openapi
 * /api/accommodation/{id}:
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
accommodationRouter.delete('/:id', async function(req, res){
    try{
        const removedAccom = await Accommodation.findByIdAndRemove({_id: req.params.id});
        
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
accommodationRouter.put('/:accomodationId', async function(req, res){
    try{
        var editedAccom = await Accommodation.updateOne(
            {_id: req.params.accommodationId},
            {$set: {name: req.body.name}});
        res.send(editedAccom);
    } catch(err){
        res.send({message: err});
    }

});

module.exports = accommodationRouter;
