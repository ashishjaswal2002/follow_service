const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: {
    type: String, // Assuming string IDs for now 
    required: true
  },
  followingId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate follows
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

// Prevent self-following (can also be done in logic, but good to have constraint if possible/checked)
// Mongoose middleware is better for self-follow check

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
