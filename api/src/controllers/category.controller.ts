import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

import categoryService from '../services/category.service'
import database from '../database'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { Image } from '../entity/Image'
import { Category } from '../entity/Category'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll()
    return res.json(categories)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdCategory = await categoryService.createOne(req.body)
    return res.status(201).json(createdCategory)
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCategory = await categoryService.deleteOne(req.params.id)
    return res.json(deletedCategory)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCategory = await categoryService.updateOne(
      req.params.id,
      req.body
    )
    return res.json(updatedCategory)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCategory = await categoryService.getOneById(req.params.id)
    return res.json(foundCategory)
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
