import { Router } from 'express'

import userController from '../controllers/user.controller'

const userRoute = Router()

userRoute.get('', userController.getAll)
userRoute.get('/:userId', userController.getOneById)
userRoute.post('', userController.createOne)
userRoute.put('/:userId', userController.updateOne)
userRoute.delete('/:userId', userController.deleteOne)

export default userRoute
