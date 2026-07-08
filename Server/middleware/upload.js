const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = file.fieldname === 'video'
            ? path.join(__dirname, '..', 'uploads', 'videos')
            : file.fieldname === 'thumbnail'
                ? path.join(__dirname, '..', 'uploads', 'thumbnails')
                : null

        if (!uploadDir) {
            return cb(new Error('Unsupported fieldname'), null)
        }

        fs.mkdirSync(uploadDir, { recursive: true })
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const newname = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, newname + path.extname(file.originalname))
    }
})

const uploadMiddleware = multer({ storage })

module.exports = uploadMiddleware