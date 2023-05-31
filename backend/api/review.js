const { RESTRouter } = require('../handler/rest_router')

const Review = require('../models/v2/review')
const reviewRouter = RESTRouter('/review', Review, {
    create: ["admin", "owner", "tenant"],
    retrieve: ["admin", "owner", "tenant"],
    update: ["admin", "owner", "tenant"],
    delete: ["admin", "owner", "tenant"]
})

module.exports = reviewRouter

/**
 * @openapi
 * components:
 *  schemas:
 *      Review:
 *          type: object
 *          required:
 *              - rating
 *              - accommodation_id
 *              - user_id 
 *          properties:
 *              rating:
 *                  type: number
 *                  description: Review rating from 0-5 stars
 *              comment:
 *                  type: string
 *                  description: Comment of user
 *              accommodation_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation reference
 *              user_id:
 *                  type: string
 *                  pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User id author reference
 * security:
 *      - bearerAuth: []
 */

/**
 * @openapi
 * /api/review:
 *      post:
 *          description: |
 *            This endpoint creates a review from the request body and **returns the created review**.
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
 *                          $ref: '#/components/schemas/Review'
 *          responses:
 *              201:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (for accommodation id).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Review
 *
 */

/**
 * @openapi
 * /api/review/{id}:
 *      get:
 *          description: |
 *            This endpoint takes the review id and **returns the found review**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            - Accommodation owners
 *            - Tenants
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
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized access
 *              500:
 *                  description: Internal server error
 *              404:
 *                  description: Review could not be found
 *          tags:
 *              - Review
 *
 */

/**
 * @openapi
 * /api/review:
 *      get:
 *          description: |
 *            This endpoint takes any search query and **returns the found review/s**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            - Accommodation owners
 *            - Tenants
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
 *                  name: rating
 *                  schema:
 *                      type: number
 *                  description: Review rating from 0-5 stars
 *              -   in: query
 *                  name: comment
 *                  schema:
 *                      type: string
 *                  description: Comment of user
 *              -   in: query
 *                  name: accommodation_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: Accommodation reference
 *              -   in: query
 *                  name: user_id
 *                  schema:
 *                      type: string
 *                      pattern: '^[0-9A-Fa-f]{24}$'
 *                  description: User reference
 *              -   in: query
 *                  name: limit
 *                  schema:
 *                      type: number
 *                  description: Number of reviews to return
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request
 *              401:
 *                  description:  Unauthorize access
 *              500:
 *                  description: Internal Service error
 *          tags:
 *              - Review
 *
 *
 */

/**
 * @openapi
 * /api/review/{id}:
 *      delete:
 *          description: |
 *            This endpoint takes the review id and **returns null**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            - Accommodation owners
 *            - Tenants
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
 *                  description: Review was deleted
 *              404:
 *                  description: The review was not found
 *              500:
 *                  description: Internal server error
 *          tags:
 *              - Review
 *
 */

/**
 * @openapi
 * /api/review/{id}:
 *      put:
 *          description: |
 *            This endpoint takes the review id, edits the specified review from the request body, and **returns the edited review**.
 * 
 *            ### This endpoint may be accessed by:
 *            - Admin
 *            - Accommodation owners
 *            - Tenants
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
 *                          $ref: '#/components/schemas/Review'
 *          responses:
 *              200:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Review'
 *              400:
 *                  description: Bad request.
 *              401:
 *                  description: Unauthorized access.
 *              404:
 *                  description: Not found (For accommodation and review).
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Review
 *
 */

