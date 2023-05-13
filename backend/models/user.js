const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer not to say'],
      default: 'male',
      required: true,
    },
    phones: {
      landline: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
    addresses: {
      home: {
        type: String,
        required: true,
      },
      current: {
        type: String,
        required: true,
      },
    },
    biography: {
      type: String,
    },
    birthday: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      url: {
        type: String,
      },
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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      // Di ako masyado sure kung ano right na type for role
      type: String,
      enum: ['admin', 'owner', 'tenant'],
      default: 'admin',
      required: true,
    },
    organization: {
      type: String,
    },
    // generatedReports: {
    //   // This will be the list of generated reports by this user
    //   type: Array,
    //   default: [],
    // },
    // bookmarks: {
    //   // This will be the list of bookmarks by this user
    //   type: Array,
    //   default: [],
    // },
    // messages: {
    //   // This will be the list of messages by this user
    //   type: Array,
    //   default: [],
    // },
    /* 
    isOnline: { // 
        type: Boolean, required: true
    },
    isVerified: { // 
        type: Boolean, required: true
    }
    // generatedReports: { // This will be the list of generated reports by this user
    //     type: Array, default : []
    // },
    // bookmarks: { // This will be the list of bookmarks by this user
    //     type: Array, default : []
    // },
    // messages: { // This will be the list of messages by this user
    //     type: Array, default : []
    // },
    // /* */
    // isOnline: { //
    //     type: Boolean, required: true
    // },
    // isVerified: { //
    //     type: Boolean, required: true
    // }
    /*                               */
  },
  { timestamps: true },
  {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last
        },
      },
    },
  }
)

module.exports = mongoose.model('User1', userSchema)
