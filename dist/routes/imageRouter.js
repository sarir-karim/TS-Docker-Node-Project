"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const imageController_1 = require("../controllers/imageController");
const multer_1 = require("../utilities/multer");
const imageRouter = express_1.default.Router();
exports.imageRouter = imageRouter;
const imageController = new imageController_1.ImageController();
// Test Route
imageRouter.get('/', imageController.index);
// Get all the images from Prisma
imageRouter.get('/all-images', imageController.allImages);
// Get an image by its ID from Prisma
imageRouter.get('/single-image/:imageId', imageController.singleImage);
imageRouter.delete('/delete-image/:imageId', imageController.deleteImage);
// TODO: Add edit route(?) that will delete the file with fs(?) as well as delete the image inside the database.
imageRouter.post('/single-upload', multer_1.upload.single('userAvatar'), imageController.singleUpload);
