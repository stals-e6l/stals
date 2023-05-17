const { Router } = require('express')
resolve = require('path').resolve

const { ERRORS, BAD_REQUEST, NOT_FOUND } = require('../handler/error_handler')
const { CREATED, OK } = require('../handler/success_handler');

const multer  = require('multer')

const assetsRouter = Router()

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve('../assets/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

/**
 * @openapi
 * /api/asset:
 *      post:
 *          description: Adds image
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              fileName:
 *                                  type: string
 *                                  format: binary
 *          responses:
 *              201:
 *                  description: Success.
 *              400:
 *                  description: Bad request.
 *              404:
 *                  description: Not found.
 *              401:
 *                  description: Unauthorized access.
 *              500:
 *                  description: Internal Server error.
 *          tags:
 *              - Assets
 *
 */
assetsRouter.post("/asset", upload.single('fileName'), async (req, res) => {
try {
    var path = resolve(req.file.path)

    res.status(CREATED).json({ success: true, data: path })
} catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
}
})

module.exports = assetsRouter;