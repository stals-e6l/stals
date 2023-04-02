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
 *          properties:
 *              name:
 *                  type: string
 *                  description: Accomodation name
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
 *                  description: The accomodation was not created
 *              
 */
accommodationRouter.post("/", async function(req, res){
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
