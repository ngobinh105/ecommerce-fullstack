import { Router } from 'express'
import fileUpload from '../middlewares/multerService'

import categoryController from '../controllers/category.controller'

const categoryRoute = Router()

categoryRoute.get('', categoryController.getAll)
categoryRoute.get('/:categoryId', categoryController.getOneById)
categoryRoute.post('', fileUpload.single('image'), categoryController.createOne)
categoryRoute.put('/:categoryId', categoryController.updateOne)
categoryRoute.delete('/:categoryId', categoryController.deleteOne)

export default categoryRoute
