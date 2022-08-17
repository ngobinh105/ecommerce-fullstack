import { Router } from 'express'
import fileUpload from '../middlewares/multerService'

import userController from '../controllers/user.controller'
import cartController from '../controllers/cart.controller'

const userRoute = Router()

userRoute.get('', userController.getAll)
userRoute.get('/:userId', userController.getOneById)
userRoute.post('', fileUpload.single('avatar'), userController.createOne)
userRoute.put('/:userId', userController.updateOne)
userRoute.delete('/:userId', userController.deleteOne)

userRoute.get('/:userId/carts', cartController.getAll)
userRoute.post('/:userId/carts', cartController.createOne)
userRoute.put('/:userId/carts/:cartItemId', cartController.updateOne)
userRoute.delete('/:userId/carts/:cartItemId', cartController.deleteOne)

export default userRoute
