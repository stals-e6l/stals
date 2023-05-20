const { RESTRouter } = require('../handler/rest_router')

const Accommodation = require('../models/v2/accommodation')
const accommodationRouter = RESTRouter('/accommodation', Accommodation, {
    create: ["admin", "owner"],
    retrieve: ["admin", "owner", "tenant"],
    update: ["admin", "owner"],
    delete: ["admin", "owner"]
})

module.exports = accommodationRouter


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
 *              - furnishing
 *              - min_price
 *              - max_price
 *              - size_sqm
 *              - meters_from_uplb
 *              - min_pax
 *              - max_pax
 *              - num_rooms
 *              - num_beds
 *              - num_views
 *              - landmarks
 *              - cooking_rules
 *              - pet_rules
 *              - other_rules
 *              - safety_and_security
 *              - appliances
 *              - amenities
 *              - is_soft_deleted
 *          properties:
 *              user_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User id that created accommodation
 *              description:
 *                  type: string
 *                  description: Description of accommodation
 *              name:
 *                  type: string
 *                  description: Accommodation name
 *              address:
 *                  type: string
 *                  description: Accommodation address
 *              type:
 *                  type: string
 *                  pattern: '^((hotel)|(apartment)|(bedspace)|(dormitory)|(transient))$'
 *                  description: Accommodation type
 *              furnishing:
 *                  type: string
 *                  pattern: '^((fully_furnished)|(semifurnished)|(unfurnished))$'
 *                  description: Accommodation type of furnishing
 *              min_price:
 *                  type: number
 *                  description: Accommodation minimum price
 *              max_price:
 *                  type: number
 *                  description: Accommodation maximum price
 *              size_sqm:
 *                  type: number
 *                  description: Accommodation size in square meters
 *              meters_from_uplb:
 *                  type: number
 *                  description: Accommodation distance from uplb in meters
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
 *              landmarks:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Accommodation nearest landmarks
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
 * security:
 *      - bearerAuth: []
 */

/**
 * @openapi
 * /api/accommodation:
 *      post:
 *          description: Adds accommodation
 *          security:
 *              -   bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Accommodation'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accommodation'
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Accommodation
 *
 */

/**
 * @openapi
 * /api/accommodation/{id}:
 *      get:
 *          description: Get accommodation by id
 *          security:
 *              -   bearerAuth: []
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
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Accommodation
 */

/**
 * @openapi
 * /api/accommodation:
 *      get:
 *          description: Get all accommodations
 *          security:
 *              -   bearerAuth: []
 *          parameters:
 *              -   in: query
 *                  name: user_id
 *                  schema:
 *                      type: string
 *                  description: User id that created accommodation
 *              -   in: query
 *                  name: description
 *                  schema:
 *                      type: string
 *                  description: Description of accommodation
 *              -   in: query
 *                  name: name
 *                  schema:
 *                      type: string
 *                  description: The name of accommodation
 *              -   in: query
 *                  name: address
 *                  schema:
 *                      type: string
 *                  description: The address of accommodation
 *              -   in: query
 *                  name: type
 *                  schema:
 *                      type: string
 *                      enum: ["hotel","apartment","bedspace","dormitory","transient"]
 *                  description: The type of accommodation
 *              -   in: query
 *                  name: furnishing
 *                  schema:
 *                      type: string
 *                      enum: ["unfurnished","semifurnished","fully_furnished"]
 *                  description: furnishing of the accommodation
 *              -   in: query
 *                  name: min_price
 *                  schema:
 *                      type: number
 *                  description: The minimum price of accommodation
 *              -   in: query
 *                  name: max_price
 *                  schema:
 *                      type: number
 *                  description: The maximum price of accommodation
 *              -   in: query
 *                  name: size_sqm
 *                  schema:
 *                      type: number
 *                  description: The size of accommodation
 *              -   in: query
 *                  name: meters_from_uplb
 *                  schema:
 *                      type: number
 *                  description: The distance of accommodation from the uplb campus
 *              -   in: query
 *                  name: min_pax
 *                  schema:
 *                      type: number
 *                  description: The minimum capacity of the accommodation
 *              -   in: query
 *                  name: max_pax
 *                  schema:
 *                      type: number
 *                  description: The maximum capacity of the accommodation
 *              -   in: query
 *                  name: num_rooms
 *                  schema:
 *                      type: number
 *                  description: The number of rooms in the accommodation
 *              -   in: query
 *                  name: num_beds
 *                  schema:
 *                      type: number
 *                  description: The number of beds in the accommodation
 *              -   in: query
 *                  name: num_views
 *                  schema:
 *                      type: number
 *                  description: The number of views of the accommodation
 *              -   in: query
 *                  name: landmarks
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The landmarks within the accommodation
 *              -   in: query
 *                  name: cooking_rules
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The cooking rules of the accommodation
 *              -   in: query
 *                  name: pet_rules
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The pet rules of the accommodation
 *              -   in: query
 *                  name: other_rules
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The other rules of the accommodation
 *              -   in: query
 *                  name: safety_and_security
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The safety and security features of the accommodation
 *              -   in: query
 *                  name: appliances
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The appliances in the accommodation
 *              -   in: query
 *                  name: amenities
 *                  schema:
 *                      type: array
 *                      collectionFormat: csv
 *                      items:
 *                          type: string
 *                      example: ["string"]
 *                  description: The included ameneties included in the accommodation
 *              -   in: query
 *                  name: is_soft_deleted
 *                  schema:
 *                      type: boolean
 *                  description: Whether the accommodation is soft deleted or not
 *              -   in: query
 *                  name: limit
 *                  schema:
 *                      type: number
 *                  description: The number of items to return
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Accommodation'
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Accommodation
 */

/**
 * @openapi
 * /api/accommodation/{id}:
 *      delete:
 *          description: Delete accommodation by id
 *          security:
 *              -   bearerAuth: []
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
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Accommodation
 *
 */

/**
 * @openapi
 * /api/accommodation/{id}:
 *      put:
 *          description: Edit accommodation by id
 *          security:
 *              -   bearerAuth: []
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
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Accommodation
 *
 */