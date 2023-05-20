const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({ 
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    pdf_url: { 
        type: String, 
        required: true
        // TODO: sprint 5 (upload pdf file)
    }, 
}, {timestamps: true});

module.exports = mongoose.model("Report", reportSchema);