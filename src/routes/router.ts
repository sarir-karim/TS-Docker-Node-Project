/**
 * The routes.
 *
 * @author Erik Claesson
 * @version 1.0.0
 */

import express from 'express'
import createHttpError from 'http-errors'

import { homeRouter } from './homeRouter'
import { imageRouter } from './imageRouter'

export const router = express.Router()

router.use('/test', (req, res) => {
  res.send('Test!!!!!!!!!!!!!!!!')
})

router.use('/', homeRouter)
router.use('/image', imageRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  next(new createHttpError.NotFound())
})
