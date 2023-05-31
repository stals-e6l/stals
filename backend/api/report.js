const { RESTRouter } = require('../handler/rest_router')

const Report = require('../models/v2/report')

const reportRouter = RESTRouter('/report', Report, {
    create: ["admin", "owner", "tenant"],
    retrieve: ["admin"],
    update: ["admin"],
    delete: ["admin"],
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
 *              - pdf_url
 *          properties:
 *              user_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User id that created report
 *              pdf_url:
 *                  type: string
 *                  description: URL of pdf
 * security:
 *      - bearerAuth: []
 */

/**
 * @openapi
 * /api/report:
 *      post:
 *          description: |
 *            This endpoint creates a report from the request body and **returns the created report**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            - Accommodation owners
 *            - Tenants
 *            
 *            ### Below is a list of status codes this API may return:
 *            1. **201** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
 *          description: |
 *            This endpoint takes the report id and **returns the found report**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
 *          description: |
 *            This endpoint takes any search query and **returns the found report/s**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
 *                  name: pdf_url
 *                  schema:
 *                      type: string
 *                  description: URL of the PDF generated
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
 *          description: |
 *            This endpoint takes the report id and **returns null**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
 *          description: |
 *            This endpoint takes the report id, edits the specified report from the request body, and **returns the edited report**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            
 *            ### Below is a list of status codes this API may return:
 *            1. **200** - OK
 *            2. **401** - Unauthorized access
 *            3. **400** - Bad user request
 *            4. **404** - Not found
 *            5. **500** - Internal server error
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
