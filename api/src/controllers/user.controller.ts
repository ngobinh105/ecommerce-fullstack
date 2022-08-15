import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'

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
    const createdUser = await userService.createOne(req.body)
    return res.status(201).json(createdUser)
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
