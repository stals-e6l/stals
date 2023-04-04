const { Router } = require('express')
const Accomodation = require("../models/accommodation");

const accommodationRouter = Router()

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
 *                  description: The accommodation was not created
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              
 */
accommodationRouter.post("/", async function(req, res){
    var accom = new Accomodation({
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        price: req.body.price,
        size_sqm: req.body.size_sqm,
        meters_from_uplb: req.body.meters_from_uplb,
        landmarks: req.body.landmarks,
        min_pax: req.body.min_pax,
        max_pax: req.body.max_pax,
        num_rooms: req.body.num_rooms,
        num_beds: req.body.num_beds,
        num_views: req.body.num_views,
        furnishing: req.body.furnishing,
        cooking_rules: req.body.cooking_rules,
        pet_rules: req.body.pet_rules,
        other_rules: req.body.other_rules,
        safety_and_security: req.body.safety_and_security,
        appliances: req.body.appliances,
        amenities: req.body.amenities,
        is_soft_deleted: req.body.is_soft_deleted
    });

    try{
        var savedAccom = await accom.save();
        res.send(savedAccom);
    } catch(err){
        if (String(err).includes("404")) {
            res.status(404).json({success: false, messages: ["Error 404: Accommodation not found"]});
        } else if(String(err).includes("401")){
            res.status(401).json({success: false, messages: ["Error 401: Unauthorized access of post method."]});
        } else {
            res.status(500).json({success: false, messages: ["Error 500: Internal server error", err]});
        }
    }  
});

/**
 * @openapi
 * /api/accommodation/{id}:
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
accommodationRouter.get('/:accomodationId', async function(req, res){
    try{
        var accom = await Accomodation.findById(req.params.accomodationId);
        res.send(accom);
    } catch(err){
        res.send({message: err});
    }
    
});

/**
 * @openapi
 * /api/accommodation:
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
accommodationRouter.get('/', async function(req, res){
    try{
        var accoms = await Accomodation.find();
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
        const removedAccom = await Accomodation.findByIdAndRemove({_id: req.params.id});
        
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
accommodationRouter.put('/:accomodationId', async function(req, res){
    try{
        var editedAccom = await Accomodation.updateOne(
            {_id: req.params.accomodationId},
            {$set: {name: req.body.name}});
        res.send(editedAccom);
    } catch(err){
        res.send({message: err});
    }

});

module.exports = accommodationRouter;
