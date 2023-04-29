const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    role: { // Di ako masyado sure kung ano right na type for role
        type: String,
        enum: ['admin', 'owner', 'tenant'],
        default: "admin",
        required: true
    },
    // generatedReports: { // This will be the list of generated reports by this user 
    //     type: Array, default : []
    // },
    // bookmarks: { // This will be the list of bookmarks by this user 
    //     type: Array, default : []
    // },
    // messages: { // This will be the list of messages by this user 
    //     type: Array, default : []
    // },
    // /* */
    // isOnline: { // 
    //     type: Boolean, required: true
    // },
    // isVerified: { // 
    //     type: Boolean, required: true
    // }
    /*                               */
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema);