const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, path, cb) => {
        if (file.fieldname == 'video'){
            cd(null, "uploads/videos/")
        }
        else if (file.fieldname == 'thumbnail'){
            cd(null, "uploads/thumbnails/")
        }
    },
    filename: (req, file, cb) => {
        const newname = Date.now() + '-' + Math.round( Math.random() * 1E9)
        cd( null, newname + file.extname(file.originalname));
    }
})

const uploadMiddlware = multer( {storage} )

export default uploadMiddlware