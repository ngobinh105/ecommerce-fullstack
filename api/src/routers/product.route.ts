import { Router } from 'express'
import fileUpload from '../middlewares/multerService'

import productController from '../controllers/product.controller'

const productRoute = Router()

productRoute.get('', productController.getAll)
productRoute.get('/:productId', productController.getOneById)
productRoute.post(
  '',
  fileUpload.array('images', 5),
  productController.createOne
)
productRoute.put('/:productId', productController.updateOne)
productRoute.delete('/:productId', productController.deleteOne)

export default productRoute
