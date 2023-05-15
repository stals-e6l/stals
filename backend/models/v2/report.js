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
          try{
            const pdf_url = new URL(url);
          } catch(err){
              return false;
          }

          return true;
        },
        message: "The provided URL for the report is not valid"
      },
      required: [true, 'PDF URL is required'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Report', reportSchema)