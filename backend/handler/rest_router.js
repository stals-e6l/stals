const { Router } = require('express')

const { ERRORS, BAD_REQUEST, NOT_FOUND } = require('./error_handler')
const { ErrorHandler } = require('./error_handler')
const { CREATED, OK } = require('./success_handler')

const Accommodation = require('../models/v2/accommodation')

const RESTRouter = function (name, model) {
  // create router
  const router = Router()

  // POST /[resource]
  router.post(name, async (req, res) => {
    try {
      const newData = await model.create({ ...req.body })

      if (!newData) {
        throw Error(ERRORS[BAD_REQUEST])
      }

      res.status(CREATED).json({ success: true, data: newData })
    } catch (err) {
      res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
    }
  })

  // GET /[resource]
  router.get(name, async (req, res) => {
    try {
      let data;
      let query = { ...req.query }
      delete query['limit'] //delete every query that's not part of the database model
      delete query['search']

      const limit = Number(req.query.limit) || 100
      if(!req.query.search){
        data = await model.find(query).limit(limit)
      }
      else{
        data = await model.find({$text: {$search: req.query.search}}).limit(limit)
      }

      if (!data) {
        throw Error(ERRORS[BAD_REQUEST])
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
    }
  })

  // GET /[resource]/:id
  router.get(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findById(req.params.id)

      if (!data) {
        throw Error(ERRORS[NOT_FOUND])
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(NOT_FOUND).json({ success: false, messages: [String(err)] })
    }
  })

  // DELETE /[resource]/:id
  router.delete(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findByIdAndRemove({ _id: req.params.id })

      if (!data) {
        throw Error(ERRORS[NOT_FOUND])
      }

      res.status(OK).json({ success: true, data: null })
    } catch (err) {
      res.status(NOT_FOUND).json({ success: false, messages: [String(err)] })
    }
  })

  // PUT /[resource]/:id
  router.put(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true },
      )

      if (!data) {
        throw Error(ERRORS[BAD_REQUEST])
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(BAD_REQUEST).json({ success: false, messages: [String(err)] })
    }
  })

  return router
}

module.exports = { RESTRouter }
