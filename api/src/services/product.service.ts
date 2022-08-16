import { Product } from '../entity/Product'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const productRepository = database.AppDataSource.getRepository(Product)

const getAll = async () => {
  return await productRepository.find()
}

const createOne = async (product: Product) => {
  return await productRepository.save(product)
}

const getOneById = async (id: string) => {
  return await productRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<Product>) => {
  const foundproduct = await productRepository.findOneBy({ id: id })
  if (foundproduct) {
    return await productRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundProduct = await productRepository.findOneBy({ id: id })
  if (foundProduct) {
    return await productRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}

export default {
  getAll,
  updateOne,
  deleteOne,
  getOneById,
  createOne,
}
