const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'default'
    },
    subscribers: [{ type: String, ref: 'User' }],
    roles: {
        type: [String],
        enum: ['user', 'admin'],
        default: ['user']
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetTokenExpiration: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;