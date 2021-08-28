import express from 'express'

import { HomeController } from '../controllers/homeController'

const homeRouter = express.Router()

const homeController = new HomeController()

homeRouter.get('/', homeController.index)

export { homeRouter }
