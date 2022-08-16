import multer from 'multer'

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const fileUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error('Only .png, .jpg and .jpeg format allowed!')
      err.name = 'ExtensionError'
      return cb(err)
    }
  },
})

export default fileUpload
