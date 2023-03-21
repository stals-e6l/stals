const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accommodationSchema = new Schema({
    owner: {type: Schema.ObjectId, ref: 'User', required: true}, //Can also be owner: {type: Number, required: true}
    // ownerID: {type: Number, required: true} // may be a better option
    name: {type: String, requried: true},
    hotelId: {type: String, required: true}, // May be useful for grouping data 
    address: {type: String, requried: true},
    latitude: {type: Decimal128, required:true},
    longitude: {type: Decimal128, required:true},
    accommodationType: {type: String, enum: ['hotel', 'apartment', 'bed space', 'dormitory', 'transient space'], required: true},

    // Embedded Sub-document for accommodation details
    details: {
        landmarks: String,
        size: {type: Number, required: true},
        minPax: {type: Number, required: true},
        maxPax: {type: Number, required: true},
        price: Decimal128,
        numView: {type: Number, default: 0},
        numRooms: Number,
        numBeds: Number,
        numCr: Number,
        proximity: {type: String, enum: ['within campus', 'outside campus'], required: true},
        furnishing: {type: String, enum: ['fully furnished', 'semi-furnished', 'unfurnished'], required: true},
        appliances: {type: String, enum: ['complete', 'incomplete'], required: true},
        fireExit: {type: String, enum: ['available', 'not available'], required: true},
        cctv: {type: String, enum: ['available', 'not available'], required: true},
        internet: {type: String, enum: ['available', 'not available'], required: true},
        airConditioning: {type: String, enum: ['available', 'not available'], required: true},
        bidet: {type: String, enum: ['available', 'not available'], required: true},
        studyArea: {type: String, enum: ['available', 'not available'], required: true},
        cookingRules: {type: String, enum: ['available', 'not available'], required: true},
        petRules: {type: String, enum: ['available', 'not available'], required: true},
        laundryArea: {type: String, enum: ['available', 'not available'], required: true},
        cookingArea: {type: String, enum: ['available', 'not available'], required: true},
    },
}, {timestamps: true}); //Uses createdAt and updatedAt


module.exports = mongoose.model("Accommodation", accommodationSchema);