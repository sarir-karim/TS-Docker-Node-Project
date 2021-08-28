/* eslint-disable class-methods-use-this */

/**
 * Module for the Image Controller.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */

import { unlink } from 'fs/promises'

import { NextFunction, Request, Response } from 'express'

import { prisma } from '../utilities/prisma'

/**
 * Encapsulates a controller.
 */
export class ImageController {
  /**
   * Code for the index page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Hello from image index!')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Code to get all the images
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async allImages(req: Request, res: Response, next: NextFunction) {
    try {
      const allImages = await prisma.image.findMany({
        orderBy: {
          updatedAt: 'desc'
        }
      })

      res.json(allImages)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Code to get a single image by its image id
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async singleImage(req: Request, res: Response, next: NextFunction) {
    const { imageId } = req.params
    try {
      const singleImage = await prisma.image.findUnique({
        where: {
          id: imageId
        }
      })

      if (!singleImage) {
        return res.status(404).json({ error: 'No image was found.' })
      }

      res.json(singleImage)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Code for the singleUpload route that returns the image url of the saved image
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async singleUpload(req: Request, res: Response, next: NextFunction) {
    console.log('req body', req.body)

    // Comes from multer, but the type is hard to get
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18569
    const { file } = req as any

    try {
      if (!file) {
        return res
          .status(400)
          .json({ error: 'You need to provide a file with the value of userAvatar!' })
      }

      const filePath = `${process.env.BACKEND_URL}/${file.path}`

      const { originalname, mimetype, destination, filename, path, size } = file

      await prisma.image.create({
        data: {
          originalName: originalname,
          mimetype,
          destination,
          filename,
          path,
          size,
          imageUrl: filePath
        }
      })

      res.json({ fileUrl: filePath })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Code to delete an image by its image id
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteImage(req: Request, res: Response, next: NextFunction) {
    const { imageId } = req.params
    try {
      const singleImage = await prisma.image.findUnique({
        where: {
          id: imageId
        }
      })

      if (!singleImage) {
        return res.status(404).json({ error: 'No image was found in the database.' })
      }

      // Delete the file locally.
      await unlink(`./uploads/images/${singleImage.filename}`)

      await prisma.image.delete({
        where: {
          id: imageId
        }
      })

      res.json(singleImage)
    } catch (error) {
      next(error)
    }
  }
}
