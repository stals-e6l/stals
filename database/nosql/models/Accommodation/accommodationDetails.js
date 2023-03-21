const mongoose = require('mongoose');

const accommodationDetailsSchema = new mongoose.Schema({
  accommodation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  details_key: { type: String, required: true },
  details_value: { type: String, required: true },
});

module.exports = mongoose.model('AccommodationDetails', accommodationDetailsSchema);
