const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const genderEnum = ['male', 'female', 'non_binary', 'prefer_not_to_say']
const roleEnum = ['admin', 'owner', 'tenant']

const userSchema = new mongoose.Schema(
  {
    full_name: {
      first_name: {
        type: String,
        required: true,
      },
      middle_name: {
        type: String,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enum: genderEnum,
      validate: {
        validator: function(v) {

          return /^((male)|(female)|(non_binary)|(prefer_not_to_say))$/.test(v);
        },
        message: 'Invalid gender input'
      },
      required: true,
    },
    phone: {
      landline: {
        type: String,
      },
      mobile: {
        type: String,
        validate: {
          validator: function(v) {
            return /((^(\+)(\d){12}$)|(^\d{11}$))/.test(v);
          },
          message: 'Not valid phone number'
        },
      },
    },
    address: {
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
    email: {
      type: String,
      required: true,
      validate:{
        validator: function(v){
          console.log("email"+v)
          return /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v);
        },
        message: 'The user email should be valid'
      },
    },
    password: {
      type: String,
      required: true,
      validate:{
        validator: function(v){
          console.log("password_raw:"+v); 
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        },
        message: 'Password should have a minimum of 8 characters and must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.'
      },
    },
    avatar: {
      url: {
        type: String,
      },
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
    },
    role: {
      type: String,
      enum: roleEnum,
      validate: {
        validator: function(v) {
          return /^((admin)|(tenant)|(owner))$/.test(v);
        },
        message: 'is not a valid role!'
      },
      required: true,
    },
    organization: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  var user = this;

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          // this.save();
          console.log("hashed password:" +user.password)
          next();
      });
  });
});




userSchema.index({ username: 1, email: 1 }, { unique: true })

module.exports = mongoose.model('User1', userSchema)
