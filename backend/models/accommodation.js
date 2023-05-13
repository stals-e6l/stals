// TODO:  make owner_id required in future sprints

const mongoose = require('mongoose')

const accommodationTypeEnum = [
  'hotel',
  'apartment',
  'bedspace',
  'dormitory',
  'transient',
]
const accommodationFurnishingEnum = [
  'unfurnished',
  'semifurnished',
  'fully_furnished',
]

const accommodationSchema = new mongoose.Schema(
  {
    // nullable
    owner_id: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
    description: { type: String, required: false },
    // required
    name: { type: String, required: true },
    image: {
      url: {
        type: String,
      },
      // filename:  {   // uses Multer
      //   type: String,
      // }F
      // desc:  {
      //   type: String,
      // },
      // file:
      // {
      //   data: {
      //     type: Buffer,
      //   },
      //   contentType: {
      //     type: String
      //   }
      // },
    },
    rating: {
      type: Number,
      required: true,
    },
    address: { type: String, required: true },
    type: {
      type: String,
      enum: accommodationTypeEnum,
      required: true,
    },
    price: { type: Number, required: true },
    size_sqm: { type: Number, required: true },
    meters_from_uplb: { type: Number, required: true },
    landmarks: { type: [String], required: true, default: [] },
    min_pax: { type: Number, required: true },
    max_pax: { type: Number, required: true },
    num_rooms: { type: Number, required: true },
    num_beds: { type: Number, required: true },
    num_views: { type: Number, required: true },
    furnishing: {
      type: String,
      required: true,
      enum: accommodationFurnishingEnum,
    },
    cooking_rules: { type: [String], required: true, default: [] },
    pet_rules: { type: [String], required: true, default: [] },
    other_rules: { type: [String], required: true, default: [] },
    safety_and_security: { type: [String], required: true, default: [] },
    appliances: { type: [String], required: true, default: [] },
    amenities: { type: [String], required: true, default: [] },
    is_soft_deleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Accommodation1', accommodationSchema)
