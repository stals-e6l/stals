const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  place_id: { type: String, required: true },
  type: {
    type: String,
    enum: ['hotel', 'apartment', 'bed space', 'dormitory', 'transient space'],
    required: true
  },
  description: { type: String },
  landmarks: { type: String },
  size_sqm: { type: Number, required: true },
  min_pax: { type: Number, required: true },
  max_pax: { type: Number, required: true },
  price_min: { type: Number },
  price_max: { type: Number },
  num_views: { type: Number, default: 0 },
  num_rooms: { type: Number, required: true },
  num_beds: { type: Number, required: true },
  num_cr: { type: Number, required: true },
  location: {
    type: String,
    enum: ['within campus', 'outside campus'],
    required: true
  },
  furnishing: {
    type: String,
    enum: ['fully furnished', 'semi-furnished', 'unfurnished'],
    required: true
  },
  cooking_rules: {
    type: String,
    enum: ['allowed', 'not allowed', 'with restrictions'],
    required: true
  },
  pet_rules: {
    type: String,
    enum: ['allowed', 'not allowed', 'with restrictions'],
    required: true
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  delete_reason: { type: String },
});

accommodationSchema.index({ owner_id: 1 });
accommodationSchema.index({ type: 1 });
accommodationSchema.index({ price_min: 1, price_max: 1 });
accommodationSchema.index({ min_pax: 1, max_pax: 1 });
accommodationSchema.index({ location: 1 });

module.exports = mongoose.model('Accommodation', accommodationSchema);
