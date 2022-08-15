import { User } from '../entity/User'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const UserRepository = database.AppDataSource.getRepository(User)

const getAll = async () => {
  return await UserRepository.find()
}

const createOne = async (user: User) => {
  return await UserRepository.save(user)
}

const getOneById = async (id: string) => {
  return await UserRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<User>) => {
  const foundUser = await UserRepository.findOneBy({ id: id })
  if (foundUser) {
    return await UserRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundUser = await UserRepository.findOneBy({ id: id })
  if (foundUser) {
    return await UserRepository.delete({ id: id })
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
