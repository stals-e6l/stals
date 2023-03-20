/* Subject to review */
/* Followed the format in report.js*/
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String, required: true 
    },
    passwordHash: {
        type: String, required: true
    },
    salt: { // For the password hash
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    phoneNumber: { 
        type: Number, required: true
    },
    role: { // Di ako masyado sure kung ano right na type for role
        type: String, required: true
    },
    createdAt: { // Date of account creation
        type: Date, required: true
    },
    generatedReports: { // This will be the list of generated reports by this user 
        type: Array, default : []
    },
    bookmarks: { // This will be the list of bookmarks by this user 
        type: Array, default : []
    },
    messages: { // This will be the list of messages by this user 
        type: Array, default : []
    },
    /*                              */
    updateAt: { // Date of last modification to profile
        type: Date, required: true
    },
    isOnline: { // 
        type: Boolean, required: true
    },
    isVerified: { // 
        type: Boolean, required: true
    }
    /*                               */
});

module.exports = mongoose.model("Report", userSchema);


