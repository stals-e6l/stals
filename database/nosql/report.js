/*  Subject to review  */
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    timeStamp: { 
        type: Date, required: true 
    },
    userReference: { // Sort of like a foreign key, user._id
        type: String, required: true 
    },
    userName: {
        type: String, required: true 
    },
    filters: { // Accommodation type, location, price range, etc.
        tags: [String], location: String , priceRange : String
    },
    reportContent: { // Accommodation references/accommodation._id that fit the filter (not certain about this)
        type: Array, default : [] 
    }, 
});

module.exports = mongoose.model("Report", reportSchema);

/* Notes 

- User model should probably have a list/array of reports they generated (report._id)
- Very much open to suggestions on what to add/remove/update

*/