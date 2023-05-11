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

const accommodationType = {
  hotel: 'hotel',
  apartment: 'apartment',
  bedspace: 'bedspace',
  dormitory: 'dormitory',
  transient: 'transient',
}

const accommodationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
    description: { type: String, required: false },
    name: { type: String, required: true },
    image: {
      url: {
        type: String,
      },
      // TODO: sprint 5
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
    address: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: accommodationTypeEnum,
    },
    furnishing: {
      type: String,
      required: true,
      enum: accommodationFurnishingEnum,
    },
    min_price: { type: Number, required: true, min: 0 },
    max_price: { type: Number, required: true },
    size_sqm: { type: Number, required: true, min: 0 },
    meters_from_uplb: { type: Number, required: true, min: 0 },
    min_pax: { type: Number, required: true, min: 0 },
    max_pax: { type: Number, required: true },
    num_rooms: { type: Number, required: true, min: 0 },
    num_beds: { type: Number, required: true , min: 0},
    num_views: { type: Number, required: true, min: 0 },
    landmarks: { type: [String], required: true, default: [] },
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

module.exports = mongoose.model('Accommodation', accommodationSchema)
