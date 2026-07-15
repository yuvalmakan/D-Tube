const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const bcrypt = require('bcrypt');
const User = require('../models/users');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { generateManualToken } = require('../jwt');

const KEY = process.env.KEY ?? "19e0cd6a0b6b895d25a1ab8ddb058fe21e1643871b1af23f1e527255c8b28a188e4342a838bcb432b47a8c7639d367ea36b35482c7ee8892c521ac56950d3ed0";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log('userController: SMTP_HOST=', process.env.SMTP_HOST || '<not set>');
transporter.verify()
    .then(() => console.log('SMTP transporter verified and ready'))
    .catch((err) => console.error('SMTP transporter verification failed:', err));

const signup = async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture || 'default',
            roles: ['user'],
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "No account with that email found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Password Incorrect" });
        }
        
        const token = generateManualToken({
            _id: user._id,
            user: user._id,
            email: user.email,
            roles: user.roles || ['user']
        }, KEY);

        return res.status(200).json({ message: "Login Successful", token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.passwordResetToken = hashedToken;
        user.passwordResetTokenExpiration = Date.now() + 15 * 60 * 1000; 

        await user.save();
        console.log('Generated resetToken (plain):', resetToken);
        console.log('Stored hashedToken:', hashedToken);

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        console.log('Attempting to send password reset email to', user.email);
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: user.email,
            subject: "DTube Password Reset",
            text: `Click here to reset your password: ${resetUrl}. This link expires in 15 minutes.`,
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 15 minutes.</p>`
        });
        console.log('Password reset email sent:', info);

        res.status(200).json({ message: "Password reset email sent." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process forgot password request' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        console.log('Received token (plain):', token);
        console.log('Computed hashedToken for lookup:', hashedToken);

        let user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            user = await User.findOne({
                passwordResetToken: hashedToken,
            });
            if (user) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiration = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to reset password' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const deleteChannel = async (req, res) => {
    try {
        const userId = req.params.id;
        if (req.user._id === userId) {
            return res.status(400).json({ message: "You cannot delete your own admin account." });
        }
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Channel deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete channel' });
    }
};

module.exports = { signup, login, forgotPassword, resetPassword, deleteChannel, getAllUsers };