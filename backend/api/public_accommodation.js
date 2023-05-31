const Accommodation = require('../models/v3/accommodation')
const { Router } = require('express')
const { ERRORS, BAD_REQUEST } = require('../handler/error_handler')
const { OK } = require('../handler/success_handler')

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
 */

/**
 * @openapi
 * /api/public_accommodation:
 *      get:
 *          description: Get all accommodations
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
const publicAccomm = async (req, res) => {
  try {
    let data
    const limit = Number(req.query.limit || 20)

    data = await Accommodation.find({}).limit(limit)

    if (!data) {
      throw Error(ERRORS[BAD_REQUEST])
    }

    res.status(OK).json({ success: true, data: data })
  } catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
  }
}

module.exports = { publicAccomm }
