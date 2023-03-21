const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccommodationMediaSchema = new Schema({
  accommodation_id: {
    type: Schema.Types.ObjectId,
    ref: 'Accommodation',
    required: true
  },
  media_id: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  }
});

AccommodationMediaSchema.index({ accommodation_id: 1, media_id: 1 }, { unique: true });

module.exports = mongoose.model('AccommodationMedia', AccommodationMediaSchema);
