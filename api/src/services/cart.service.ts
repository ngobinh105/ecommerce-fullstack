import { CartItem } from '../entity/CartItem'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const getAllByUser = async (userId: string) => {
  const cartItemRepository = database.AppDataSource.getRepository(CartItem)
  return await cartItemRepository
    .createQueryBuilder('cart_item')
    .leftJoinAndSelect('cart_item.product', 'product')
    .where('cart_item.user = :userId', { userId })
    .getMany()
}

const createOne = async (cartItem: CartItem) => {
  const cartItemRepository = database.AppDataSource.getRepository(CartItem)
  return await cartItemRepository.save(cartItem)
}

const updateOne = async (id: string, update: Partial<CartItem>) => {
  const cartItemRepository = database.AppDataSource.getRepository(CartItem)
  const foundCartItem = await cartItemRepository.findOneBy({ id: id })
  if (foundCartItem) {
    return await cartItemRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const cartItemRepository = database.AppDataSource.getRepository(CartItem)
  const foundCartItem = await cartItemRepository.findOneBy({ id: id })
  if (foundCartItem) {
    return await cartItemRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}

export default {
  getAllByUser,
  updateOne,
  deleteOne,
  createOne,
}
