const mongoose = require('mongoose');

const accommodationAmenitiesSchema = new mongoose.Schema({
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  amenities: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Amenities'
  }
});

const AccommodationAmenities = mongoose.model('AccommodationAmenities', accommodationAmenitiesSchema);

module.exports = AccommodationAmenities;
