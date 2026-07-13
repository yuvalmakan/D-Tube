const mongoose = require('mongoose');
const Like = require('../models/likeSchema');
const User = require('../models/users');
const Video = require('../models/videos');
const Comment = require('../models/comments');

const toggleLike = async (req, res) => {
    try {
        const currVid = req.params.id;
        const userID = req.user?._id || req.user?.user;

        if (!userID) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const existingLike = await Like.findOne({ userId: userID, videoId: currVid });

        if (!existingLike) {
            await Like.create({ userId: userID, videoId: currVid });
            return res.status(200).json({ success: true, liked: true, message: 'Liked' });
        }

        await Like.findOneAndDelete({ userId: userID, videoId: currVid });
        return res.status(200).json({ success: true, liked: false, message: 'Disliked' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Couldn't connect to database" });
    }
};

const liked = async (req, res) => {
    try {
        const currVid = req.params.id;
        const userID = req.user?._id || req.user?.user;

        if (!userID) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const existingLike = await Like.findOne({ userId: userID, videoId: currVid });

        if (existingLike) {
            return res.status(200).json({ success: true, liked: true });
        }
        return res.status(200).json({ success: true, liked: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Couldn't connect to database" });
    }
};

const toggleSub = async (req, res) => {
    try {
        const currVid = req.params.id;
        const userID = req.user?._id || req.user?.user;

        if (!userID) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const video = await Video.findById(currVid);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const targetUserId = video.uploaderId;

        if (!targetUserId) {
            return res.status(404).json({ success: false, message: 'Uploader not found' });
        }

        if (userID.toString() === targetUserId.toString()) {
            return res.status(400).json({ success: false, message: 'You cannot subscribe to yourself' });
        }

        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isSubscribed = targetUser.subscribers.some((subId) => subId.toString() === userID.toString());

        if (!isSubscribed) {
            await User.findByIdAndUpdate(targetUserId, { $addToSet: { subscribers: userID } });
            return res.status(200).json({ success: true, subscribed: true, message: 'Subscribed' });
        }

        await User.findByIdAndUpdate(targetUserId, { $pull: { subscribers: userID } });
        return res.status(200).json({ success: true, subscribed: false, message: 'Unsubscribed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Couldn't connect to database" });
    }
};

const subscribed = async (req, res) => {
    try {
        const currVid = req.params.id;
        const userID = req.user?._id || req.user?.user;

        if (!userID) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const video = await Video.findById(currVid);

        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const targetUser = await User.findById(video.uploaderId);

        if (!targetUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isSubscribed = targetUser.subscribers.some((subId) => subId.toString() === userID.toString());

        return res.status(200).json({ success: true, subscribed: isSubscribed });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Couldn't connect to database" });
    }
};

const comment = async (req, res) => {
    try {
        const currVid = req.params.id;
        const userID = req.user?._id || req.user?.user;

        if (!userID) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!mongoose.Types.ObjectId.isValid(currVid)) {
            return res.status(400).json({ success: false, message: 'Invalid video ID' });
        }

        const video = await Video.findById(currVid);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        const { comment: commentText } = req.body;

        if (!commentText || typeof commentText !== 'string' || !commentText.trim()) {
            return res.status(400).json({ success: false, message: 'Comment text is required' });
        }

        const newComment = new Comment({
            videoId: currVid,
            userId: userID,
            text: commentText.trim()
        });

        await newComment.save();

        return res.status(200).json({ success: true, message: 'Comment added' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Couldn't connect to database" });
    }
}

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);

  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments from database" });
  }
};

module.exports = { toggleLike, liked, toggleSub, subscribed, comment, getComments };
