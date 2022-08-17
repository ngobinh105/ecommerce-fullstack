import { CartItem } from '../entity/CartItem'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const cartItemRepository = database.AppDataSource.getRepository(CartItem)

const getAll = async () => {
  return await cartItemRepository
    .createQueryBuilder('cart_item')
    .leftJoinAndSelect('cart_item.product', 'product')
    .leftJoinAndSelect('cart_item.user', 'user')
    .getMany()
}

const createOne = async (cartItem: CartItem) => {
  return await cartItemRepository.save(cartItem)
}

const updateOne = async (id: string, update: Partial<CartItem>) => {
  const foundCartItem = await cartItemRepository.findOneBy({ id: id })
  if (foundCartItem) {
    return await cartItemRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundCartItem = await cartItemRepository.findOneBy({ id: id })
  if (foundCartItem) {
    return await cartItemRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}

export default {
  getAll,
  updateOne,
  deleteOne,
  createOne,
}
