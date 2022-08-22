import { Router } from 'express'
import fileUpload from '../middlewares/multerService'

import productController from '../controllers/product.controller'
import reviewController from '../controllers/review.controller'
import userMiddleware from '../middlewares/userMiddleware'

const productRoute = Router()
// product route
productRoute.get('', productController.getAll)
productRoute.get('/:productId', productController.getOneById)
productRoute.post(
  '',
  fileUpload.array('images', 5),
  productController.createOne
)
productRoute.put(
  '/:productId',
  userMiddleware.verifyAdmin,
  productController.updateOne
)
productRoute.delete(
  '/:productId',
  userMiddleware.verifyAdmin,
  productController.deleteOne
)
// review route
productRoute.get('/:productId/reviews', reviewController.getAllByProduct)
productRoute.post('/:productId/reviews', reviewController.createOne)
productRoute.put('/:productId/reviews/:reviewId', reviewController.updateOne)
productRoute.delete('/:productId/reviews/:reviewId', reviewController.deleteOne)

export default productRoute
