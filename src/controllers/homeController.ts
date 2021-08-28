/* eslint-disable class-methods-use-this */

import { NextFunction, Request, Response } from "express"

/**
 * Module for the Home Controller.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Code for the index page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('Hello from Index!')
    } catch (error) {
      next(error)
    }
  }
}
