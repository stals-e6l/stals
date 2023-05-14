const mongoose = require('mongoose')

const User = require('./user')

const accommodationTypeEnum = [
  'hotel',
  'apartment',
  'bedspace',
  'dormitory',
  'transient',
]
const accommodationFurnishingEnum = [
  'unfurnished',
  'semifurnished',
  'fully_furnished',
]

const accommodationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.ObjectId, 
      ref: 'User', 
      validate: {
        validator: async function(value){
          const user = await User.findById(value);
          if (!user) return false;
          else return true;
        }, message: "The user accessing the accommodation does not exist"
      },
      required: false 
    },
    description: { type: String, required: false },
    name: { type: String, required: [true, "Accommodation name is required."]},
    image: {
      url: {
        type: String, required: false
      },
    },
    address: { type: String, required: [true, "Accommodation address is required."]},
    type: {
      type: String,
      validate: {
        validator: function(value){
          return accommodationTypeEnum.includes(value);
        }, message: props => `${props.value} is not a valid type.`
      },
      required: [true, "Accommodation type is required."],
      enum: accommodationTypeEnum,
    },
    furnishing: {
      type: String,
      validate: {
        validator: function(value){
          return accommodationFurnishingEnum.includes(value);
        }, message: props => `${props.value} is not a furnishing description.`
      },
      required: [true, "Accommodation furnishing description is required"],
      enum: accommodationFurnishingEnum,
    },
    min_price: { 
      type: Number, 
      validate: {
        validator: function(value){
          if (value < 0)  return false;
          else return true;
        }
      },
      required: [true, "Accommodation minimum price is required."], 
    },
    max_price: { type: Number, required: [true, "Accommodation maximum price is required."] },
    size_sqm: { type: Number, validate:{
      validator: function(value){
        if(value < 0) return false;
        else return true;
      }
     }, required: [true, "Accommodation size in square meter is required."]},
    meters_from_uplb: { type: Number, required: [true, "Accommodation distance from UPLB is required."]},
    min_pax: { type: Number, validate:{
      validator: function(value){
        if(value < 0) return false;
        else return true;
      }, message: "Minimum number of pax allowed should be 0."
     }, required: true},
    max_pax: { type: Number, required: true },
    num_rooms: { type: Number, validate:{
      validator: function(value){
        if(value < 0) return false;
        else return true;
      }, message: "Minimum number of rooms allowed should be 0."
     }, required: true},
    num_beds: { type: Number, validate:{
      validator: function(value){
        if(value < 0) return false;
        else return true;
      }, message: "Minimum number of beds allowed should be 0."
     }, required: true},
    num_views: { type: Number, validate:{
      validator: function(value){
        if(value < 0) return false;
        else return true;
      }, message: "Minimum number of views allowed should be 0."
     }, required: true},
    landmarks: { type: [String], required: true, default: [] },
    cooking_rules: { type: [String], required: true, default: [] },
    pet_rules: { type: [String], required: true, default: [] },
    other_rules: { type: [String], required: true, default: [] },
    safety_and_security: { type: [String], required: true, default: [] },
    appliances: { type: [String], required: true, default: [] },
    amenities: { type: [String], required: true, default: [] },
    is_soft_deleted: { type: Boolean, default: false, required: true },
  },
  { timestamps: true })

module.exports = mongoose.model('Accommodation', accommodationSchema)
