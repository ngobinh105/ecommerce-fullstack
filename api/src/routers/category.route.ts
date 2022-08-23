import { Router } from 'express'
import fileUpload from '../middlewares/multerService'

import categoryController from '../controllers/category.controller'
import userMiddleware from '../middlewares/userMiddleware'

const categoryRoute = Router()

categoryRoute.get('', categoryController.getAll)
categoryRoute.get('/:categoryId', categoryController.getOneById)
categoryRoute.post(
  '',
  fileUpload.single('image'),
  userMiddleware.verifyAdmin,
  categoryController.createOne
)
categoryRoute.put(
  '/:categoryId',
  userMiddleware.verifyAdmin,
  categoryController.updateOne
)
categoryRoute.delete(
  '/:categoryId',
  userMiddleware.verifyAdmin,
  categoryController.deleteOne
)

export default categoryRoute
