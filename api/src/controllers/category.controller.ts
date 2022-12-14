import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import dotenv from 'dotenv'

import categoryService from '../services/category.service'
import database from '../database'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { Image } from '../entity/Image'
import { Category } from '../entity/Category'

dotenv.config({ path: '.env' })
const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DEPLOY_URL
    : process.env.LOCAL_URL
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
    const imageRepository = database.AppDataSource.getRepository(Image)
    if (req.file?.path) {
      const data = fs.readFileSync(req.file?.path)
      const checkImage = await imageRepository.findOneBy({ imageData: data })
      let image
      if (checkImage) {
        image = `${URL}/api/v1/images/${checkImage.id}`
      } else {
        const savedImage = await imageRepository.save({ imageData: data })
        image = `${URL}/api/v1/images/${savedImage.id}`
      }
      const newCategory = database.AppDataSource.getRepository(Category).create(
        { image, name: req.body.name }
      )
      const createdRepository = await categoryService.createOne(newCategory)
      return res.status(201).json(createdRepository)
    } else {
      throw new NotFoundError('File cannot be empty')
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedOne = await categoryService.deleteOne(req.params.categoryId)
    return res.status(204).json(deletedOne)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryService.updateOne(req.params.categoryId, req.body)
    const updatedCategory = await database.AppDataSource.getRepository(
      Category
    ).findOneBy({ id: req.params.categoryId })
    return res.json(updatedCategory)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCategory = await categoryService.getOneById(
      req.params.categoryId
    )
    return res.json(foundCategory)
  } catch (e) {
    return next(e)
  }
}
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await categoryService.getAllProducts(req.params.categoryId)
    return res.json(products)
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
  getAllProducts,
}
