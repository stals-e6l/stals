const mongoose = require('mongoose');

const locationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['campus', 'hospital', 'market'],
    required: true
  }
});

const Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;
