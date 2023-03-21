const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  accommodation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  safety_rating: { type: String, enum: ['very safe', 'safe', 'somewhat safe', 'unsafe', 'very unsafe'], required: true },
  cleanliness: { type: String, enum: ['very clean', 'clean', 'somewhat clean', 'dirty', 'very dirty'], required: true },
  content: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  delete_reason: { type: String },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
