import { NextFunction, Router, Request, Response } from 'express'
import passport from 'passport'
import dotenv from 'dotenv'

import userController from '../controllers/user.controller'
import userMiddleware from '../middlewares/userMiddleware'
import { UnauthorizedError } from '../helpers/apiError'

dotenv.config({ path: '.env' })
const authRoute = Router()

authRoute.post('/login', userMiddleware.verifyLogin, userController.userLogin)
authRoute.get('/login', userController.userLogin)
authRoute.get('/profile', userController.verifyUser)
authRoute.post('/findUser', userController.getOne)
authRoute.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  }),
  (req: Request, res: Response) => {
    res.redirect(process.env.CLIENT_URL ? process.env.CLIENT_URL : '')
  }
)
authRoute.get(
  '/login/failed',
  (req: Request, res: Response, next: NextFunction) => {
    throw new UnauthorizedError('Failed to authorize user')
  }
)

authRoute.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect(process.env.CLIENT_URL ? process.env.CLIENT_URL : '')
  })
})

export default authRoute
