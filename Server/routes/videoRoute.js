const express = require('express')

const router = express.Router();

const { uploadVideo, getAllVideos, streamVideo } = require('../controllers/videoController');

const auth = require('../middleware/auth')
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

router.get('/play/:id', streamVideo)


module.exports = router;