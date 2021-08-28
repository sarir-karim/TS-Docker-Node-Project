"use strict";
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
/**
 * Module for the Image Controller.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */
const promises_1 = require("fs/promises");
const prisma_1 = require("../utilities/prisma");
/**
 * Encapsulates a controller.
 */
class ImageController {
    /**
     * Code for the index page.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async index(req, res, next) {
        try {
            res.send('Hello from image index!');
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Code to get all the images
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async allImages(req, res, next) {
        try {
            const allImages = await prisma_1.prisma.image.findMany({
                orderBy: {
                    updatedAt: 'desc'
                }
            });
            res.json(allImages);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Code to get a single image by its image id
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async singleImage(req, res, next) {
        const { imageId } = req.params;
        try {
            const singleImage = await prisma_1.prisma.image.findUnique({
                where: {
                    id: imageId
                }
            });
            if (!singleImage) {
                return res.status(404).json({ error: 'No image was found.' });
            }
            res.json(singleImage);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Code for the singleUpload route that returns the image url of the saved image
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async singleUpload(req, res, next) {
        console.log('req body', req.body);
        // Comes from multer, but the type is hard to get
        // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18569
        const { file } = req;
        try {
            if (!file) {
                return res
                    .status(400)
                    .json({ error: 'You need to provide a file with the value of userAvatar!' });
            }
            const filePath = `${process.env.BACKEND_URL}/${file.path}`;
            const { originalname, mimetype, destination, filename, path, size } = file;
            await prisma_1.prisma.image.create({
                data: {
                    originalName: originalname,
                    mimetype,
                    destination,
                    filename,
                    path,
                    size,
                    imageUrl: filePath
                }
            });
            res.json({ fileUrl: filePath });
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Code to delete an image by its image id
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async deleteImage(req, res, next) {
        const { imageId } = req.params;
        try {
            const singleImage = await prisma_1.prisma.image.findUnique({
                where: {
                    id: imageId
                }
            });
            if (!singleImage) {
                return res.status(404).json({ error: 'No image was found in the database.' });
            }
            // Delete the file locally.
            await promises_1.unlink(`./uploads/images/${singleImage.filename}`);
            await prisma_1.prisma.image.delete({
                where: {
                    id: imageId
                }
            });
            res.json(singleImage);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ImageController = ImageController;
