const express = require('express')

const router = express.Router();

const videoController = require('../controllers/videoController');

const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

router.post('/create', auth, upload, videoController.uploadVideo);


module.exports = router;