const express = require('express');
const router = express.Router();
const { toggleLike, liked, toggleSub, subscribed, comment, getComments } = require('../controllers/engagementController');

const { auth } = require('../middleware/auth');

router.post('/togglelike/:id', auth, toggleLike);

router.get('/liked/:id', auth, liked);

router.post('/togglesub/:id', auth, toggleSub);

router.get('/subscribed/:id', auth, subscribed);

router.post('/comment/:id', auth, comment);

router.get('/getComments/:id', getComments);

module.exports = router;