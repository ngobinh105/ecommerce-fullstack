import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User } from '../entity/User'
import database from '../database'
import { UnauthorizedError, NotFoundError } from '../helpers/apiError'

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
      throw new NotFoundError('User not found')
    }
  } catch (e) {
    return next(e)
  }
}

export default {
  verifyLogin,
}
