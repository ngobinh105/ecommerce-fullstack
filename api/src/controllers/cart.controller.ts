import { Request, Response, NextFunction } from 'express'

import cartService from '../services/cart.service'
import { CartItem } from '../entity/CartItem'

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = await cartService.getAll()
    return res.json(cartItems)
  } catch (e) {
    return next(e)
  }
}
const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId } = req.body
    const newCartItem = new CartItem()
    newCartItem.user = userId
    newCartItem.product = productId
    const createdCartItem = await cartService.createOne(newCartItem)
    return res.status(201).json(createdCartItem)
  } catch (e) {
    return next(e)
  }
}
const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCartItem = await cartService.deleteOne(req.params.cartItemId)
    return res.json(deletedCartItem)
  } catch (e) {
    return next(e)
  }
}
const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCartItem = await cartService.updateOne(
      req.params.cartItemId,
      req.body
    )
    return res.json(updatedCartItem)
  } catch (e) {
    return next(e)
  }
}

export default {
  getAll,
  createOne,
  deleteOne,
  updateOne,
}
