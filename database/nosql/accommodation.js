const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accommodationSchema = new Schema({
    owner: {type: Schema.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    hotelId: {type: String, required: true}, // May be useful for grouping data 
    address: {type: String, required: true},
    accommodationType: {type: String, enum: ['hotel', 'apartment', 'bedspace', 'dormitory', 'transient'], required: true},
    isSoftDeleted: {type: Boolean, default: false, required: true},
    rules: [String],

    // Embedded Sub-document for accommodation details
    details: {
        landmarks: [String],
        size: {type: Decimal128, required: true},
        minPax: {type: Number, required: true, default: 1},
        maxPax: {type: Number, required: true},
        price: {type: Decimal128, required: true},
        numViews: {type: Number, default: 0},
        numRooms: {type: Number, default: 1},
        numBeds: {type: Number, default: 1},
        numCr: {type: Number, default: 0},
        metersFromUplb: {type: Decimal128, required: true}, // meters from campus
        furnishing: {type: String, enum: ['fully furnished', 'semi-furnished', 'unfurnished'], required: true},
        appliances: {type: [String], required: true},
        amenities: {type: [String], required: true},
        fireExit: {type: String, enum: ['available', 'not available'], required: true},
        cookingRules: {type: [String], required: true},
        petRules: {type: [String], required: true},
    }
}, {timestamps: true}); //Uses createdAt and updatedAt


module.exports = mongoose.model("Accommodation", accommodationSchema);