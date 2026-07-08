const express = require('express')

const router = express.Router();

const { uploadVideo } = require('../controllers/videoController');

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


module.exports = router;