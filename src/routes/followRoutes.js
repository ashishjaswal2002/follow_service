const express = require('express');
const Follow = require('../models/Follow');
const User = require('../models/User');
const AppError = require('../utils/errors');

const router = express.Router();

// Helper to validate users exist
const validateUsersExist = async (followerId, followingId) => {
    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower) throw new AppError(`Follower with ID ${followerId} does not exist`, 404);
    if (!following) throw new AppError(`User to follow with ID ${followingId} does not exist`, 404);
};

// Follow a user
router.post('/follow', async (req, res, next) => {
    try {
        const { followerId, followingId } = req.body;

        if (!followerId || !followingId) {
            return next(new AppError('Please provide followerId and followingId', 400));
        }

        if (followerId === followingId) {
            return next(new AppError('You cannot follow yourself', 400));
        }

        // Validate Users Exist
        await validateUsersExist(followerId, followingId);

        // Check if already following
        const existingFollow = await Follow.findOne({ followerId, followingId });
        if (existingFollow) {
            return next(new AppError('You are already following this user', 400));
        }

        const follow = await Follow.create({ followerId, followingId });

        res.status(201).json({
            status: 'success',
            data: {
                follow
            }
        });
    } catch (err) {
        if (err.code === 11000) {
            return next(new AppError('You are already following this user', 400));
        }
        next(err);
    }
});

// Unfollow a user
router.post('/unfollow', async (req, res, next) => {
    try {
        const { followerId, followingId } = req.body;

        if (!followerId || !followingId) {
            return next(new AppError('Please provide followerId and followingId', 400));
        }

        // Ideally we should also check if users exist, but for unfollow 
        // simply not finding the relationship is often enough. 
        // However, explicitly checking users gives better error messages.
        await validateUsersExist(followerId, followingId);

        const follow = await Follow.findOneAndDelete({ followerId, followingId });

        if (!follow) {
            return next(new AppError('You are not following this user', 404));
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
});

// Get list of users following a specific user (Followers)
router.get('/followers/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Find all follow records
        const follows = await Follow.find({ followingId: userId });

        if (!follows || follows.length === 0) {
            return next(new AppError('No followers found', 404));
        }

        // Extract follower IDs
        const followerIds = follows.map(f => f.followerId);

        // Fetch User details
        const users = await User.find({ _id: { $in: followerIds } });

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                // Map to ensure we return what the gateway expects, or just return the user objects
                // Mongoose returns _id, we might want to map it clearly if needed, 
                // but the gateway can handle _id -> id mapping if we want, or do it here.
                followers: users
            }
        });
    } catch (err) {
        next(err);
    }
});

// Get list of users a specific user is following (Following)
router.get('/following/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Find all follow records
        const follows = await Follow.find({ followerId: userId });

        if (!follows || follows.length === 0) {
            return next(new AppError('No following found', 404));
        }

        // Extract following IDs
        const followingIds = follows.map(f => f.followingId);

        // Fetch User details
        const users = await User.find({ _id: { $in: followingIds } });

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                following: users
            }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
