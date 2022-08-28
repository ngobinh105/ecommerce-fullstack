import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { Image } from '../entity/Image'
import database from '../database'
import userService from '../services/user.service'
import { NotFoundError, UnauthorizedError } from '../helpers/apiError'
import { User } from '../entity/User'
import { Address } from '../entity/Address'
import { UserDecodedPayload } from '../types/token'

dotenv.config({ path: '.env' })
const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DEPLOY_URL
    : process.env.LOCAL_URL
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll()
    return res.json(users)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageRepository = database.AppDataSource.getRepository(Image)
    if (req.file?.path) {
      const data = fs.readFileSync(req.file?.path)
      const checkImage = await imageRepository.findOneBy({ imageData: data })
      let avatar
      if (checkImage) {
        avatar = `${URL}/api/v1/images/${checkImage.id}`
      } else {
        const image = await imageRepository.save({ imageData: data })
        avatar = `${URL}/api/v1/images/${image.id}`
      }
      const { firstName, lastName, email, password, role } = req.body
      const newUser = database.AppDataSource.getRepository(User).create({
        firstName,
        lastName,
        email,
        password,
        avatar,
        role: role ? role : 'buyer',
      })
      const createdUser = await userService.createOne(newUser)
      return res.status(201).json(createdUser)
    } else {
      const { firstName, lastName, email, password, role, avatar } = req.body
      const newUser = database.AppDataSource.getRepository(User).create({
        firstName,
        lastName,
        email,
        password,
        avatar,
        role: role ? role : 'buyer',
      })
      const createdUser = await userService.createOne(newUser)
      return res.status(201).json(createdUser)
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userService.deleteOne(req.params.userId)
    return res.status(204).json(deletedUser)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.updateOne(req.params.userId, req.body)
    const updatedUser = await database.AppDataSource.getRepository(
      User
    ).findOneBy({ id: req.params.userId })
    return res.json(updatedUser)
  } catch (e) {
    return next(e)
  }
}
const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await userService.getOne(req.body.email)
    if (foundUser) {
      const userJSON = JSON.stringify(foundUser)
      const token = jwt.sign(
        { userJSON },
        process.env.JWT_SECRET ? process.env.JWT_SECRET : '',
        { expiresIn: '1d' }
      )
      res.json(token)
    } else {
      throw new NotFoundError('User not found')
    }
  } catch (e) {
    return next(e)
  }
}
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user
    const userJSON = JSON.stringify(user)
    const token = jwt.sign(
      user ? { userJSON } : '',
      process.env.JWT_SECRET ? process.env.JWT_SECRET : '',
      { expiresIn: '1d' }
    )
    res.json(token)
  } catch (e) {
    return next(e)
  }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1]
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET ? process.env.JWT_SECRET : ''
        ) as UserDecodedPayload
        res.json(JSON.parse(decoded.userJSON))
      } catch (e) {
        throw new UnauthorizedError('Invalid token')
      }
    } else {
      throw new NotFoundError('Token is missing')
    }
  } catch (e) {
    return next(e)
  }
}
const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params
  const user = await database.AppDataSource.getRepository(User).findOneBy({
    id: userId,
  })
  if (user) {
    const { addressType, city, country, state, postalCode, street } = req.body
    const userAddress = database.AppDataSource.getRepository(Address).create({
      addressType,
      city,
      country,
      state,
      postalCode,
      street,
    })
    userAddress.user = user
    const savedAddress = await database.AppDataSource.getRepository(
      Address
    ).save(userAddress)
    res.status(201).json(savedAddress)
  } else {
    throw new NotFoundError('User not found')
  }
}

export default {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  userLogin,
  verifyUser,
  getOne,
  updateAddress,
}
