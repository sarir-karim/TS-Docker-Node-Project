"use strict";
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
/**
 * Module for the Home Controller.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */
/**
 * Encapsulates a controller.
 */
class HomeController {
    /**
     * Code for the index page.
     *
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async index(req, res, next) {
        try {
            res.send('Hello from Index!');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.HomeController = HomeController;
