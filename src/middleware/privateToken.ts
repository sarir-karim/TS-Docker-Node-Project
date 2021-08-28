import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

/**
 * Checks for the X-PRIVATE-TOKEN
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {object} - returns an unauthenticated view.
 */
function checkPrivateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['x-private-token']

  if (!authHeader) {
    throw new createHttpError.Unauthorized()
  }

  if (authHeader !== process.env.PRIVATE_TOKEN) {
    throw new createHttpError.Unauthorized()
  }

  next()
}

export { checkPrivateToken }
