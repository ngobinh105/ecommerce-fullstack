import { Router } from 'express'
import fileUpload from '../middlewares/multerService.js'

import userController from '../controllers/user.controller.js'
import cartController from '../controllers/cart.controller.js'
import reviewController from '../controllers/review.controller.js'
import userMiddleware from '../middlewares/userMiddleware.js'

const userRoute = Router()
// user route
userRoute.get('', userMiddleware.verifyAdmin, userController.getAll)
userRoute.post('', fileUpload.single('avatar'), userController.createOne)
userRoute.put('/:userId', userController.updateOne)
userRoute.delete('/:userId', userController.deleteOne)
// cart route
userRoute.get('/:userId/carts', cartController.getAllByUser)
userRoute.post('/:userId/carts', cartController.createOne)
userRoute.put('/:userId/carts/:cartItemId', cartController.updateOne)
userRoute.delete('/:userId/carts/:cartItemId', cartController.deleteOne)
// review route
userRoute.get('/:userId/reviews', reviewController.getAllByUser)
userRoute.post('/:userId/reviews', reviewController.createOne)
userRoute.put('/:userId/reviews/:reviewId', reviewController.updateOne)
userRoute.delete('/:userId/reviews/:reviewId', reviewController.deleteOne)

export default userRoute
