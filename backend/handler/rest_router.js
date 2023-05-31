const { Router } = require('express')

const {
  ERRORS,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
} = require('./error_handler')
const { ErrorHandler } = require('./error_handler')
const { CREATED, OK } = require('./success_handler')

const Accommodation = require('../models/v3/accommodation')

const RESTRouter = function (name, model, restriction) {
  // create router
  const router = Router()

  // POST /[resource]
  router.post(name, async (req, res) => {
    try {
      if (!restriction.create.includes(req.user.role)) {
        throw Error(ERRORS[UNAUTHORIZED])
      }

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
      if (!restriction.retrieve.includes(req.user.role)) {
        throw Error(ERRORS[UNAUTHORIZED])
      }
      let data

      let query = { ...req.query }
      delete query['limit'] //delete every query that's not part of the database model
      delete query['populate']

      const limit = Number(req.query.limit) || 100
      const populate = req.query.populate

      if (!query.search) {
        data = await model.find(query).limit(limit).populate(populate)
      } else {
        data = await model
          .find({ $text: { $search: query.search } })
          .limit(limit).populate(populate)
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
      if (!restriction.retrieve.includes(req.user.role)) {
        throw Error(ERRORS[UNAUTHORIZED])
      }

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
      if (!restriction.delete.includes(req.user.role)) {
        throw Error(ERRORS[UNAUTHORIZED])
      }

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
      if (!restriction.update.includes(req.user.role)) {
        throw Error(ERRORS[UNAUTHORIZED])
      }

      const data = await model.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true, runValidators: true }
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
