const mongoose = require('mongoose')

const genderEnum = ['male', 'female', 'non_binary', 'prefer_not_to_say']
const roleEnum = ['admin', 'owner', 'tenant']

const userSchema = new mongoose.Schema(
  {
    // full_name: {
    //   first_name: {
    //     type: String,
    //     required: true,
    //   },
    //   middle_name: {
    //     type: String,
    //   },
    //   last_name: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // gender: {
    //   type: String,
    //   enum: genderEnum,
    //   required: true,
    // },
    // phone: {
    //   landline: {
    //     type: String,
    //   },
    //   mobile: {
    //     type: String,
    //   },
    // },
    // address: {
    //   home: {
    //     type: String,
    //     required: true,
    //   },
    //   current: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // biography: {
    //   type: String,
    // },
    // birthday: {
    //   type: Date,
    //   required: true,
    // },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // avatar: {
    //   url: {
    //     type: String,
    //   },
      // TODO: sprint 5
      // filename:  {   // uses Multer
      //   type: String,
      // },
      // desc:  {
      //   type: String,
      // },
      // img:
      // {
      //   data: {
      //     type: Buffer,
      //   },
      //   contentType: {
      //     type: String
      //   }
      // },
    // },
    role: {
      type: String,
      enum: roleEnum,
      required: true,
    },
    // organization: {
    //   type: String,
    // },
  },
  { timestamps: true }
)

userSchema.index({ username: 1, email: 1 }, { unique: true })

module.exports = mongoose.model('User', userSchema)
