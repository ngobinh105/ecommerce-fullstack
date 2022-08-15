import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { validate } from 'class-validator'

import { Image } from '../entity/Image'
import database from '../database'
import userService from '../services/user.service'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { User } from '../entity/User'

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
      const { firstName, lastName, email, username, password } = req.body

      const newUser = new User()
      newUser.firstName = firstName
      newUser.lastName = lastName
      newUser.email = email
      newUser.username = username
      newUser.password = password

      const error = await validate(newUser)
      if (error.length > 0) {
        throw new BadRequestError()
      } else {
        const createdUser = await userService.createOne(newUser)
        return res.status(201).json(createdUser)
      }
    } else {
      throw new NotFoundError()
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUser = await userService.deleteOne(req.params.id)
    return res.json(deletedUser)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await userService.updateOne(req.params.id, req.body)
    return res.json(updatedUser)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await userService.getOneById(req.params.id)
    return res.json(foundUser)
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
}
