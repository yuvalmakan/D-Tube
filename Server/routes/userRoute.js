const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/forgot-password', userController.forgotPassword);

router.post('/reset-password', userController.resetPassword);

router.delete('/delete-channel/:id', auth, isAdmin, userController.deleteChannel);

router.get('/users', auth, isAdmin, userController.getAllUsers);

module.exports = router;