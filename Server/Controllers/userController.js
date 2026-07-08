require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const {generateManualToken} = require('../jwt')
const KEY = process.env.KEY ?? "19e0cd6a0b6b895d25a1ab8ddb058fe21e1643871b1af23f1e527255c8b28a188e4342a838bcb432b47a8c7639d367ea36b35482c7ee8892c521ac56950d3ed0";

const signup = async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture || 'default'
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
        const token = generateManualToken({ user: user._id}, KEY)

        // Successful login - return minimal user info (do not send password)
        return res.status(200).json({ message: "Login Successful", token: token})
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

module.exports = { signup, login };