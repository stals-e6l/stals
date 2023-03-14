const { Router } = require('express')
const user = require('../../entities/user')

const auth = Router()

auth.post('/api/signup', async (req, res) => {
  try {
    const result = await user.create(req.body)

    if (!result) {
      throw new Error('Error creating user!')
    }

    res.status(201).json({
      status: 'ok',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      status: 'error',
      messages: [String(err)],
    })
  }
})

module.exports = auth
