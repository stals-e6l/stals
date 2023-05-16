const accommodations = require('../mock/v2/accommodation.json')
const reviews = require('../mock/v2/review.json')
const { Router } = require('express')
const { OK } = require('../handler/success_handler')

const router = Router()

router.get('/accommodations', async (req, res) => {
  res.status(OK).json({ success: true, data: accommodations })
})

router.get('/accommodations/:id', async (req, res) => {
  res.status(OK).json({ success: true, data: accommodations[0] })
})

router.get('/reviews', async (req, res) => {
  res.status(OK).json({ success: true, data: reviews })
})

router.get('/reviews/:id', async (req, res) => {
  res.status(OK).json({ success: true, data: reviews[0] })
})

module.exports = router
