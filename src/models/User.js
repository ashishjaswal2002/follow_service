const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {
        type: String, // Using String IDs for easier testing (e.g., "user1")
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
