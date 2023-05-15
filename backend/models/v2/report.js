const mongoose = require('mongoose')

const User = require('./user')

const reportSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: async function(id) {
          const user = await User.findById(id);
          if (!user) return false;
          else return true;
        },
        message: "The user generating the report does not exist"
      },
      required: [true, 'User id is required'],
    },
    pdf_url: {
      type: String,
      validate: {
        validator: async function(url) {
          // url_regex will accept the following examples:
          //    -- facebook.com
          //    -- https://facebook.com
          //    -- https://www.facebook.com
          const url_regex = new RegExp('((https?:\/\/(?:www\.|(?!www)))?[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')

          if (!url_regex.test(url)) return false;
          else return true;
        },
        message: "The provided URL for the report is not valid"
      },
      required: [true, 'PDF URL is required'],
      // TODO: sprint 5 (upload pdf file)
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Report', reportSchema)