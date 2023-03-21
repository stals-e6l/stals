const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserMediaSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  media_id: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  }
});

UserMediaSchema.index({ user_id: 1, media_id: 1 }, { unique: true });

module.exports = mongoose.model('UserMedia', UserMediaSchema);
