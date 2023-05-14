const mongoose = require('mongoose')

const Accommodation = require('./accommodation')
const User = require('./user')

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
    },
    accommodation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Accommodation',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

reviewSchema.path('accommodation_id').validate(async function (value) {
  const accom = await Accommodation.findById(value);
  if (!accom) return false;
  else return true;
}, "Invalid Accommodation ID")

reviewSchema.path('user_id').validate(async function (value) {
  const user = await User.findById(value);
  if (!user) return false;
  else return true;
}, "Invalid User ID")

module.exports = mongoose.model('Review', reviewSchema)
