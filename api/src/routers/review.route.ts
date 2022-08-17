import { Router } from 'express'

import reviewController from '../controllers/review.controller'

const reviewRoute = Router()

reviewRoute.get('', reviewController.getAll)
reviewRoute.get('/:reviewId', reviewController.getOneById)
reviewRoute.post('', reviewController.createOne)
reviewRoute.put('/:reviewId', reviewController.updateOne)
reviewRoute.delete('/:reviewId', reviewController.deleteOne)

export default reviewRoute
