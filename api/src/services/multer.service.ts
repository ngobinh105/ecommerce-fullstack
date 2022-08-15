import multer from 'multer'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileUpload = multer({ storage }).single('avatar')

export default fileUpload
