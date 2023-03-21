const mongoose = require('mongoose');

const reportAccommodationSchema = new mongoose.Schema({
  report_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
    required: true
  },
  accommodation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true
  }
});

module.exports = mongoose.model('ReportAccommodation', reportAccommodationSchema);
