var mongoose = require("mongoose");

//describes how user is gonna look
const accomodationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Accomodation", accomodationSchema);