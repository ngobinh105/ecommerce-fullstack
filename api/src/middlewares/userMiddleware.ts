import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { User } from '../entity/User'
import database from '../database'
import { NotFoundError, UnauthorizedError } from '../helpers/apiError'
import { UserDecodedPayload } from 'token'

dotenv.config({ path: '.env' })

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const foundUser = await database.AppDataSource.getRepository(
      User
    ).findOneBy({
      email,
    })
    if (foundUser) {
      const checkPassword = await foundUser.comparePassword(password)
      if (checkPassword) {
        req.user = foundUser
        return next()
      } else {
        throw new UnauthorizedError('Your password is incorrect')
      }
    } else {
      throw new NotFoundError('User Not Found')
    }
  } catch (e) {
    return next(e)
  }
}

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1]
    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET ? process.env.JWT_SECRET : ''
      ) as UserDecodedPayload
      const user = JSON.parse(decoded.userJSON)
      console.log(user.role)
      if (user.role === 'admin') {
        return next()
      } else {
        throw new UnauthorizedError('You are not allowed to view this')
      }
    } else {
      throw new NotFoundError('Token is missing')
    }
  } catch (e) {
    return next(e)
  }
}

export default {
  verifyLogin,
  verifyAdmin,
}
