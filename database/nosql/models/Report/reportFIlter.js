const mongoose = require('mongoose');

const reportFilterSchema = new mongoose.Schema({
  filter_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ReportFilter', reportFilterSchema);
