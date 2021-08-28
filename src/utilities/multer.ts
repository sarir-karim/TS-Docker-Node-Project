import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/images')
  },
  filename(req, file, callback) {
    const nameFormat = `${new Date().toISOString()}_${file.originalname}`
    callback(null, nameFormat)
  }
})

function uploadFilter(req: Request, file: Express.Multer.File, callback: any) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    // Reject the file and do not save it
    callback(new Error('That file type is not accepted.'), false)
  }
}

const upload = multer({
  storage,
  dest: 'uploads/images',
  fileFilter: uploadFilter,
  limits: {
    // 2 mb file size limit
    fileSize: 2_000_000
  }
})

export { upload }
