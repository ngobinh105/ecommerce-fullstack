import { Category } from '../entity/Category.js'
import database from '../database.js'
import { NotFoundError } from '../helpers/apiError.js'

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

export default {
  getAll,
  updateOne,
  deleteOne,
  getOneById,
  createOne,
}
