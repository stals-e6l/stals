import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    status: {
        type: String, enum: ['active', 'archived', 'deleted'], required: true
    },
    userReference: {
        type: Number, required: true
    },
    accomReference: {
        type: Number, required: true
    }
});

module.exports = mongoose.model("Forum", forumSchema);