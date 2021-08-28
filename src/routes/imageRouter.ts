import express from 'express'

import { ImageController } from '../controllers/imageController'
import { upload } from '../utilities/multer'

const imageRouter = express.Router()

const imageController = new ImageController()

// Test Route
imageRouter.get('/', imageController.index)

// Get all the images from Prisma
imageRouter.get('/all-images', imageController.allImages)
// Get an image by its ID from Prisma
imageRouter.get('/single-image/:imageId', imageController.singleImage)

imageRouter.delete('/delete-image/:imageId', imageController.deleteImage)

// TODO: Add edit route(?) that will delete the file with fs(?) as well as delete the image inside the database.

imageRouter.post('/single-upload', upload.single('userAvatar'), imageController.singleUpload)

// TODO: Add support for multiple file upload?

export { imageRouter }
