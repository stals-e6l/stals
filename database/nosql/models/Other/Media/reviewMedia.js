const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewMediaSchema = new Schema({
  review_id: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  },
  media_id: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  }
});

ReviewMediaSchema.index({ review_id: 1, media_id: 1 }, { unique: true });

module.exports = mongoose.model('ReviewMedia', ReviewMediaSchema);
