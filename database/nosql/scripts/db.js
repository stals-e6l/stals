const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/accommodation_db', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
  }
}

module.exports = { connect };