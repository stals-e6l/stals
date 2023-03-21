const mongoose = require('mongoose');

const appliancesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Appliances = mongoose.model('Appliances', appliancesSchema);

module.exports = Appliances;
