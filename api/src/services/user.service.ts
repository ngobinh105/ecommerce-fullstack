import { User } from '../entity/User'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const getAll = async () => {
  const userRepository = database.AppDataSource.getRepository(User)
  return await userRepository.find()
}

const createOne = async (user: User) => {
  const userRepository = database.AppDataSource.getRepository(User)
  return await userRepository.save(user)
}

const updateOne = async (id: string, update: Partial<User>) => {
  const userRepository = database.AppDataSource.getRepository(User)
  const foundUser = await userRepository.findOneBy({ id: id })
  if (foundUser) {
    return await userRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const userRepository = database.AppDataSource.getRepository(User)
  const foundUser = await userRepository.findOneBy({ id: id })
  if (foundUser) {
    return await userRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}

const getOne = async (email: string) => {
  const userRepository = database.AppDataSource.getRepository(User)
  return await userRepository.findOneBy({ email })
}

export default {
  getAll,
  updateOne,
  deleteOne,
  createOne,
  getOne,
}
