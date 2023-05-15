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
    name: { type: String, required: [true, "Accommodation name is required"]},
    image: {
      url: {
        type: String, required: false
      },
    },
    address: { type: String, required: [true, "Accommodation address is required"]},
    type: {
      type: String,
      validate: {
        validator: function(value){
          return accommodationTypeEnum.includes(value);
        }, message: props => `${props.value} is not a valid accommodation type`
      },
      required: [true, "Accommodation type is required"],
      enum: accommodationTypeEnum,
    },
    furnishing: {
      type: String,
      validate: {
        validator: function(value){
          return accommodationFurnishingEnum.includes(value);
        }, message: props => `${props.value} is not a valid furnishing type`
      },
      required: [true, "Accommodation furnishing type is required"],
      enum: accommodationFurnishingEnum,
    },
    min_price: { 
      type: Number, 
      validate: {
        validator: function(value){
          return !isNaN(value) && value >= 0;
        }, message: "Accommodation minimum price should be a number greater than or equal to 0"
      },
      required: [true, "Accommodation minimum price is required"], 
    },
    max_price: { 
      type: Number, 
      validate: {
        validator: function(value){
          return !isNaN(value) && value >= this.get("min_price");
        }, message: "Accommodation maximum price should be a number greater than or equal to accommodation minimum price"
      }, required: [true, "Accommodation maximum price is required"] },
    size_sqm: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Accommodation size in square meter should be a number greater than 0"
     }, required: [true, "Accommodation size in square meter is required"]},
    meters_from_uplb: { type: Number, validate: {
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Accommodation distance from UPLB should be a number greater than 0"
     },required: [true, "Accommodation distance from UPLB is required"]},
    min_pax: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Accommodation minimum pax allowed should be a number greater than 0"
     }, required: [true, "Accommodation minimum number of pax is required"]},
    max_pax: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value >= this.get("min_pax");
      }, message: "Accommodation maximum pax allowed should be a number greater than the minimum number of pax allowed"
     }, required: [true, "Accommodation maximum number of pax is required"] },
    num_rooms: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Accommodation minimum number of rooms should be greater than 0"
     }, required: true},
    num_beds: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Minimum number of beds allowed should be greater than 0"
     }, required: true},
    num_views: { type: Number, validate:{
      validator: function(value){
        return !isNaN(value) && value > 0;
      }, message: "Minimum number of views allowed should be greater than 0"
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
