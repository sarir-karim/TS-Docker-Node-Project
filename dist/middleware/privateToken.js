"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrivateToken = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * Checks for the X-PRIVATE-TOKEN
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {object} - returns an unauthenticated view.
 */
function checkPrivateToken(req, res, next) {
    const authHeader = req.headers['x-private-token'];
    if (!authHeader) {
        throw new http_errors_1.default.Unauthorized();
    }
    if (authHeader !== process.env.PRIVATE_TOKEN) {
        throw new http_errors_1.default.Unauthorized();
    }
    next();
}
exports.checkPrivateToken = checkPrivateToken;
