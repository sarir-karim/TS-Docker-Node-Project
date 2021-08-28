"use strict";
/**
 * The routes.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const homeRouter_1 = require("./homeRouter");
const imageRouter_1 = require("./imageRouter");
exports.router = express_1.default.Router();
exports.router.use('/test', (req, res) => {
    res.send('Test!!!!!!!!!!!!!!!!');
});
exports.router.use('/', homeRouter_1.homeRouter);
exports.router.use('/image', imageRouter_1.imageRouter);
// Catch 404 (ALWAYS keep this as the last route).
exports.router.use('*', (req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
