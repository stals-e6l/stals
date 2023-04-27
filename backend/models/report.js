/* Updated schema */
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({ 
    timestamps: true, 
    user_id: { // Sort of like a foreign key, user._id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    pdf_url: { // Used to generate a pdf for the report
        type: String, 
        required: true
    }, 
});

module.exports = mongoose.model("Report", reportSchema);