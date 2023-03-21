const mongoose = require('mongoose');

const filterValueAccommodationSchema = new mongoose.Schema({
  filter_value_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportFilterValue',
    required: true
  },
  accommodation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true
  }
});

module.exports = mongoose.model('FilterValueAccommodation', filterValueAccommodationSchema);
