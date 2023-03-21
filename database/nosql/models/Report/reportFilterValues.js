const mongoose = require('mongoose');

const reportFilterValuesSchema = new mongoose.Schema({
  filter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportFilter',
    required: true
  },
  filter_value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ReportFilterValue', reportFilterValuesSchema);
