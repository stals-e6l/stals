const mongoose = require('mongoose');

const accommodationAppliancesSchema = new mongoose.Schema({
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation'
  },
  appliances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appliances'
  }
});

const AccommodationAppliances = mongoose.model('AccommodationAppliances', accommodationAppliancesSchema);

module.exports = AccommodationAppliances;
