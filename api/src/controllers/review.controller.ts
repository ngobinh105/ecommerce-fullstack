import { Request, Response, NextFunction } from 'express'

import reviewService from '../services/review.service'
import { Review } from '../entity/Review'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reviews = await reviewService.getAll()
    return res.json(reviews)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { review, rate, userId, productId } = req.body
    const newReview = new Review()
    newReview.review = review
    newReview.rate = rate
    newReview.user = userId
    newReview.product = productId
    const createdReview = await reviewService.createOne(newReview)
    return res.status(201).json(createdReview)
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedReview = await reviewService.deleteOne(req.params.reviewId)
    return res.json(deletedReview)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedReview = await reviewService.updateOne(
      req.params.reviewId,
      req.body
    )
    return res.json(updatedReview)
  } catch (e) {
    return next(e)
  }
}
const getOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundReview = await reviewService.getOneById(req.params.reviewId)
    return res.json(foundReview)
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
