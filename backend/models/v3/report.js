const mongoose = require('mongoose')

const User = require('./user')

const reportSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: async function (id) {
          const user = await User.findById(id)
          if (!user) return false
          else return true
        },
        message: 'The user generating the report does not exist',
      },
      required: [true, 'User id is required'],
    },
    accommodation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accommodation',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Report', reportSchema)
