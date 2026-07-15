const express = require('express')

const router = express.Router();

const { uploadVideo, getAllVideos, streamVideo } = require('../controllers/videoController');

const { auth } = require('../middleware/auth')
const { viewed } = require('../middleware/views');
const upload = require('../middleware/upload')

router.post(
  '/create',
  auth,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  uploadVideo
)

router.get('/videos', getAllVideos)

router.get('/play/:id', viewed, streamVideo)


module.exports = router;