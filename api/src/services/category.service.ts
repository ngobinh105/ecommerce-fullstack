import { Category } from '../entity/Category'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const getAll = async () => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  return await categoryRepository.find()
}

const createOne = async (category: Category) => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  return await categoryRepository.save(category)
}

const getOneById = async (id: string) => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  return await categoryRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<Category>) => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  const foundCategory = await categoryRepository.findOneBy({ id: id })
  if (foundCategory) {
    return await categoryRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  const foundCategory = await categoryRepository.findOneBy({ id: id })
  if (foundCategory) {
    return await categoryRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}
const getAllProducts = async (categoryId: string) => {
  const categoryRepository = database.AppDataSource.getRepository(Category)
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: ['products'],
  })
  return category?.products
}

export default {
  getAll,
  updateOne,
  deleteOne,
  getOneById,
  createOne,
  getAllProducts,
}
