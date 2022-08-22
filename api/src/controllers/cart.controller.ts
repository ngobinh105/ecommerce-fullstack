import { Request, Response, NextFunction } from 'express'

import cartService from '../services/cart.service'
import { CartItem } from '../entity/CartItem'
import { User } from '../entity/User'
import { Product } from '../entity/Product'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const getAllByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const cartItems = await cartService.getAllByUser(userId)
    return res.json(cartItems)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId } = req.body
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      id: userId,
    })
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({
      id: productId,
    })
    if (user && product) {
      const newCartItem = database.AppDataSource.getRepository(CartItem).create(
        { user, product }
      )
      const createdCartItem = await cartService.createOne(newCartItem)
      return res.status(201).json(createdCartItem)
    } else {
      throw new NotFoundError('User and Product are required')
    }
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartService.deleteOne(req.params.cartItemId)
    return res.status(204)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartService.updateOne(req.params.cartItemId, req.body)
    const updatedCartItem = await database.AppDataSource.getRepository(
      CartItem
    ).findOneBy({ id: req.params.cartItemId })
    return res.json(updatedCartItem)
  } catch (e) {
    return next(e)
  }
}

export default {
  getAllByUser,
  createOne,
  deleteOne,
  updateOne,
}
