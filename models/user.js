const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
       
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    memberIds: {
        type: [String],
        unique: true // Define memberId as unique
    },
    username: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false // Default value for isAdmin field
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
