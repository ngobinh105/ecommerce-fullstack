import { Router } from 'express'
import userController from '../controllers/user.controller'
import userMiddleware from '../middlewares/userMiddleware'

const authRoute = Router()

authRoute.post('/login', userMiddleware.verifyLogin, userController.userLogin)
authRoute.post('/profile', userController.verifyUser)

export default authRoute
