const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
  media_type: {
    type: String,
    enum: ['image', 'video', 'audio'],
    required: true
  },
  file_name: {
    type: String,
    required: true
  },
  file_path: {
    type: String,
    required: true
  },
  file_size: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', MediaSchema);
