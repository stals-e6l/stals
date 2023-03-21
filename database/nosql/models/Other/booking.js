const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  booking_date: { type: Date, default: Date.now },
  accommodation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  move_in_date: { type: Date },
  move_out_date: { type: Date },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], required: true },
  is_soft_deleted: { type: Boolean, default: false },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
