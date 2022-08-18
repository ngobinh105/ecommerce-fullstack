import { User } from '../entity/User'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const userRepository = database.AppDataSource.getRepository(User)

const getAll = async () => {
  return await userRepository.find()
}

const createOne = async (user: User) => {
  return await userRepository.save(user)
}

const getOneById = async (id: string) => {
  return await userRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<User>) => {
  const foundUser = await userRepository.findOneBy({ id: id })
  if (foundUser) {
    return await userRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundUser = await userRepository.findOneBy({ id: id })
  if (foundUser) {
    return await userRepository.delete({ id: id })
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
