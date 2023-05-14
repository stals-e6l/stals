const mongoose = require('mongoose')

const Accommodation = require('./accommodation')
const User = require('./user')

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
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

reviewSchema.path('rating').validate(function (value) {
  if (value < 0 || value > 5) return false;
  else return true;
}, "Rating should be within the range 0-5 only")

reviewSchema.path('accommodation_id').validate(async function (value) {
  const accom = await Accommodation.findById(value);
  if (!accom) return false;
  else return true;
}, "The accommodation the user is reviewing does not exist")

reviewSchema.path('user_id').validate(async function (value) {
  const user = await User.findById(value);
  if (!user) return false;
  else return true;
}, "The user reviewing the accommodation does not exist")

module.exports = mongoose.model('Review', reviewSchema)
