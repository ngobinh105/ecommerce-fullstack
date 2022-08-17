import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

import productService from '../services/product.service'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'
import { Image } from '../entity/Image'
import { Product } from '../entity/Product'
import { Category } from '../entity/Category'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAll()
    return res.json(products)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.files) {
      const imageRepository = database.AppDataSource.getRepository(Image)
      const files = req.files as Express.Multer.File[]
      const data = files.map((file) => fs.readFileSync(file.path))
      const savedImages = await Promise.all(
        data.map(async (imageData) => {
          const checkImage = await imageRepository.findOneBy({
            imageData: imageData,
          })
          if (checkImage) {
            return `http://localhost:5000/images/${checkImage.id}`
          } else {
            const image = await imageRepository.save({ imageData: imageData })
            return `http://localhost:5000/images/${image.id}`
          }
        })
      )

      const { title, price, description, stock, categoryId } = req.body
      const newProduct = new Product()
      newProduct.title = title
      newProduct.price = price
      newProduct.description = description
      newProduct.stock = stock
      newProduct.images = savedImages
      newProduct.category = categoryId
      const createdProduct = await productService.createOne(newProduct)
      return res.status(201).json(createdProduct)
    } else {
      throw new NotFoundError('Files cannot be empty')
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await productService.deleteOne(req.params.id)
    return res.json(deletedProduct)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await productService.updateOne(
      req.params.id,
      req.body
    )
    return res.json(updatedProduct)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundProduct = await productService.getOneById(req.params.id)
    return res.json(foundProduct)
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
