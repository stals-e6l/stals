/* Updated schema 04-27-2023 4:30pm */
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({ 
    user_id: { // Sort of like a foreign key, user._id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    pdf_url: { // Used to generate a pdf for the report
        type: String, 
        required: true
    }, 
}, {timestamps: true});

module.exports = mongoose.model("Report", reportSchema);