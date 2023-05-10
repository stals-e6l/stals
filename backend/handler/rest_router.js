const { Router } = require('express')

const { ERRORS, BAD_REQUEST, NOT_FOUND } = require('./error_handler')
const { ErrorHandler } = require('./error_handler')
const { CREATED, OK } = require('./success_handler')

const RESTRouter = function (name, model) {
  // create router
  const router = Router()

  // POST /[resource]
  router.post(name, async (req, res) => {
    try {
      const newData = await model.create({ ...req.body })

      if (!newData) {
        throw BAD_REQUEST
      }

      res.status(CREATED).json({ status: true, data: newData })
    } catch (err) {
      res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
  })

  // GET /[resource]
  router.get(name, async (req, res) => {
    try {
      let query = { ...req.query }
      delete query['limit'] //delete every query that's not part of the database model

      const limit = Number(req.query.limit) || 100
      const data = await model.find(query).limit(limit)

      if (!data) {
        throw BAD_REQUEST
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
  })

  // GET /[resource]/:id
  router.get(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findById(req.params.id)

      if (!data) {
        throw NOT_FOUND
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
  })

  // DELETE /[resource]/:id
  router.delete(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findByIdAndRemove({ _id: req.params.id })

      if (!data) {
        throw NOT_FOUND
      }

      res.status(OK).json({ success: true, data: null })
    } catch (err) {
      res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
  })

  // PUT /[resource]/:id
  router.put(`${name}/:id`, async (req, res) => {
    try {
      const data = await model.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      )

      if (!data) {
        throw BAD_REQUEST
      }

      res.status(OK).json({ success: true, data: data })
    } catch (err) {
      res.status(err).json({ success: false, messages: [ERRORS[err]] })
    }
  })

  return router
}

module.exports = { RESTRouter }
