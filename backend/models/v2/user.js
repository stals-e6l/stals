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
        required: [true, "First name is required"],
      },
      middle_name: {
        type: String,
      },
      last_name: {
        type: String,
        required: [true, "Last name is required"],
      },
    },
    gender: {
      type: String,
      enum: {values:genderEnum,message:'Invalid input for gender'},
      required: [true, "Gender is required"],
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
        required: [true, "Home address is required"],
      },
      current: {
        type: String,
        required: [true, "Current address is required"],
      },
    },
    biography: {
      type: String,
    },
    birthday: {
      type: Date,
      min:['1900-01-01',' Invalid birthday input'],
      max: [new Date(), 'Invalid birthday'],
      validate:{
        validator: function(v){
          return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$}/.test(v);
        },
        message: 'Birthday format should be YYYY-mm-dd'
      },


      
      required: [true, "Birthday is required input"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate:{
        validator: function(v){
          return /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(v);
        },
        message: 'The user email should be valid'
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate:{
        validator: function(v){
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
      enum: {values:roleEnum,message:'Invalid input for role'},
      required: [true, "Role is required"],
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
      if (err){
        const error = new Error('Internal server error')
        return next(error);
      } 

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            const error = new Error('Internal server error')
            return next(error);
          }
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});




userSchema.index({ username: 1, email: 1 }, { unique: true })

module.exports = mongoose.model('User', userSchema)
