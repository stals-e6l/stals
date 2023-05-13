const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    // content: { // array ng comments/chats ng isang user
    //     type: [String],
    //     required: true,
    //     default: [],
    // },
    // status: { // status of the forum/chat conversation
    //     type: String,
    //     enum: ['active', 'archived', 'deleted'],
    //     required: true
    // },
    is_public: { // either public forum or private chat
        type: Boolean,
        required: true
    },
    accommodation_id: { // accomodation reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accommodation',
        required: true
    },
    user_id: { // user reference
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
    },
    is_soft_deleted: { 
        type: Boolean, 
        default: false, 
        required: true 
    },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Review1", reviewSchema);