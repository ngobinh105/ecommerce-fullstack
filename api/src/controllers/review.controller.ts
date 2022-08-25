import { Request, Response, NextFunction } from 'express'

import reviewService from '../services/review.service'
import { Review } from '../entity/Review'
import database from '../database'
import { User } from '../entity/User'
import { Product } from '../entity/Product'
import { BadRequestError } from '../helpers/apiError'

const getAllByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const reviews = await reviewService.getAllByUser(userId)
    return res.json(reviews)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { review, rate, userId, productId } = req.body
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      id: userId,
    })
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({
      id: productId,
    })
    const checkUserReview = await database.AppDataSource.getRepository(
      Review
    ).findOne({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    })
    if (user && product && !checkUserReview) {
      const addedReview = database.AppDataSource.getRepository(Review).create({
        review,
        rate,
        user,
        product,
      })

      const createdReview = await reviewService.createOne(addedReview)
      return res.status(201).json(createdReview)
    } else {
      throw new BadRequestError('User has already reviewed this product')
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedReview = await reviewService.deleteOne(req.params.reviewId)
    return res.status(204).json(deletedReview)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await reviewService.updateOne(req.params.reviewId, req.body)
    const updatedReview = await database.AppDataSource.getRepository(
      Review
    ).findOneBy({ id: req.params.reviewId })
    return res.json(updatedReview)
  } catch (e) {
    return next(e)
  }
}
const getAllByProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params
    const reviews = await reviewService.getAllByProduct(productId)
    return res.json(reviews)
  } catch (e) {
    return next(e)
  }
}

export default {
  getAllByUser,
  createOne,
  deleteOne,
  updateOne,
  getAllByProduct,
}
