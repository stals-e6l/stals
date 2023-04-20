const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema(
  {
    // required
    name: { type: String, required: true },
  }
)

module.exports = mongoose.model('Forum', forumSchema)
