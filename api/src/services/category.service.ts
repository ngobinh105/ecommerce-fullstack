import { Category } from '../entity/Category'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const categoryRepository = database.AppDataSource.getRepository(Category)

const getAll = async () => {
  return await categoryRepository.find()
}

const createOne = async (category: Category) => {
  return await categoryRepository.save(category)
}

const getOneById = async (id: string) => {
  return await categoryRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<Category>) => {
  const foundCategory = await categoryRepository.findOneBy({ id: id })
  if (foundCategory) {
    return await categoryRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
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
