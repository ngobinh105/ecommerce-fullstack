import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { Image } from '../entity/Image'
import database from '../database'
import userService from '../services/user.service'
import { NotFoundError } from '../helpers/apiError'
import { User } from '../entity/User'
import { Address } from '../entity/Address'

dotenv.config({ path: '.env' })
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
        avatar = `http://localhost:5000/images/${checkImage.id}`
      } else {
        const image = await imageRepository.save({ imageData: data })
        avatar = `http://localhost:5000/images/${image.id}`
      }
      const {
        firstName,
        lastName,
        email,
        password,
        addressType,
        city,
        country,
        state,
        postalCode,
        street,
      } = req.body

      const userAddress = database.AppDataSource.getRepository(Address).create({
        addressType,
        city,
        country,
        state,
        postalCode,
        street,
      })

      const newUser = database.AppDataSource.getRepository(User).create({
        firstName,
        lastName,
        email,
        password,
        avatar,
        addresses: [userAddress],
      })

      const createdUser = await userService.createOne(newUser)
      return res.status(201).json(createdUser)
    } else {
      throw new NotFoundError()
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userService.deleteOne(req.params.userId)
    return res.json(deletedUser)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateOne(req.params.userId, req.body)
    return res.json(updatedUser)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await userService.getOneById(req.params.userId)
    return res.json(foundUser)
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

export default {
  getAll,
  createOne,
  deleteOne,
  updateOne,
  getOneById,
  userLogin,
}
