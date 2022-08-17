import { Review } from '../entity/Review'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const reviewRepository = database.AppDataSource.getRepository(Review)

const getAll = async () => {
  return await reviewRepository.find()
}

const createOne = async (review: Review) => {
  return await reviewRepository.save(review)
}

const getOneById = async (id: string) => {
  return await reviewRepository.findOneBy({ id: id })
}

const updateOne = async (id: string, update: Partial<Review>) => {
  const foundReview = await reviewRepository.findOneBy({ id: id })
  if (foundReview) {
    return await reviewRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const foundReview = await reviewRepository.findOneBy({ id: id })
  if (foundReview) {
    return await reviewRepository.delete({ id: id })
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
