const express = require('express');
const router = express.Router();
const { toggleLike, liked, toggleSub, subscribed } = require('../controllers/engagementController');

const auth = require('../middleware/auth');

router.post('/togglelike/:id', auth, toggleLike);

router.get('/liked/:id', auth, liked);

router.post('/togglesub/:id', auth, toggleSub);

router.get('/subscribed/:id', auth, subscribed);

module.exports = router;