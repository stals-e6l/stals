const { RESTRouter } = require('../handler/rest_router')

const Report = require('../models/v3/report')

const reportRouter = RESTRouter('/report', Report, {
  create: ['admin', 'tenant'],
  retrieve: ['admin', 'owner', 'tenant'],
  update: ['admin', 'tenant'],
  delete: ['admin', 'tenant'],
})

module.exports = reportRouter

/**
 * @openapi
 * components:
 *  schemas:
 *      Report:
 *          type: object
 *          required:
 *              - user_id
 *              - accommodation_id
 *          properties:
 *              user_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User id that created report
 *              accommodation_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation that is being reported
 * security:
 *      - bearerAuth: []
 */

/**
 * @openapi
 * /api/report:
 *      post:
 *          description: Create report
 *          security:
 *              -   bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Report'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *
 */

/**
 * @openapi
 * /api/report/{id}:
 *      get:
 *          description: Get report by id
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
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *              404:
 *                  description: Not found.
 *          tags:
 *              - Report
 *
 */

/**
 * @openapi
 * /api/report:
 *      get:
 *          description: Get all reports
 *          security:
 *              -   bearerAuth: []
 *          parameters:
 *              -   in: query
 *                  name: user_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User that generated the report
 *              -   in: query
 *                  name: accommodation_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation that is being reported
 *              -   in: query
 *                  name: limit
 *                  schema:
 *                      type: number
 *                  description: Number of reports to return
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description:  Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *
 *
 */

/**
 * @openapi
 * /api/report/{id}:
 *      delete:
 *          description: Delete report by id
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
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Report'
 *              404:
 *                  description: Not found.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *
 */

/**
 * @openapi
 * /api/report/{id}:
 *      put:
 *          description: Edit report by id
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
 *                          $ref: '#/components/schemas/Report'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Report'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Report
 *
 */
