const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
  salt: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  role: { type: String, enum: ['admin', 'owner', 'public', 'tenant'], required: true },
  is_online: { type: Boolean, required: true, default: false },
  is_verified: { type: Boolean, required: true, default: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('User', userSchema);
