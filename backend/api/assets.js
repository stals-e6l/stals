const { Router} = require('express')
resolve = require('path').resolve

const { ERRORS, BAD_REQUEST, NOT_FOUND } = require('../handler/error_handler')
const { CREATED, OK } = require('../handler/success_handler')

const multer = require('multer')

const assetsRouter = Router()
const ASSETS_DIR = resolve('./assets/')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ASSETS_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

assetsRouter.post('/asset', upload.single('fileName'), async (req, res) => {
  try {
    const path = `${process.env.PROTOCOL}://${process.env.API_HOST}:${process.env.ASSET_PORT}/api/asset/${req.file.filename}`

    res.status(CREATED).json({ success: true, data: path })
  } catch (err) {
    res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
  }
})

//assetsRouter.use('/asset',(ASSETS_DIR))

// module.exports = assetsRouter
module.exports = { ASSETS_DIR, assetsRouter }
