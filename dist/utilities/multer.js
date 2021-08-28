"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        callback(null, './uploads/images');
    },
    filename(req, file, callback) {
        const nameFormat = `${new Date().toISOString()}_${file.originalname}`;
        callback(null, nameFormat);
    }
});
function uploadFilter(req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        // Reject the file and do not save it
        callback(new Error('That file type is not accepted.'), false);
    }
}
const upload = multer_1.default({
    storage,
    dest: 'uploads/images',
    fileFilter: uploadFilter,
    limits: {
        // 2 mb file size limit
        fileSize: 2000000
    }
});
exports.upload = upload;
