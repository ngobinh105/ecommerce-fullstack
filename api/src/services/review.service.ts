import { Review } from '../entity/Review'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const getAllByUser = async (userId: string) => {
  const reviewRepository = database.AppDataSource.getRepository(Review)
  return await reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.product', 'product')
    .where('review.user.id = :userId', { userId })
    .getMany()
}

const createOne = async (review: Review) => {
  const reviewRepository = database.AppDataSource.getRepository(Review)
  return await reviewRepository.save(review)
}

const getAllByProduct = async (productId: string) => {
  const reviewRepository = database.AppDataSource.getRepository(Review)
  return await reviewRepository
    .createQueryBuilder('review')
    .leftJoinAndSelect('review.user', 'user')
    .where('review.product.id = :productId', { productId })
    .select(['review', 'user'])
    .getMany()
}

const updateOne = async (id: string, update: Partial<Review>) => {
  const reviewRepository = database.AppDataSource.getRepository(Review)
  const foundReview = await reviewRepository.findOneBy({ id: id })
  if (foundReview) {
    return await reviewRepository.update({ id: id }, update)
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const reviewRepository = database.AppDataSource.getRepository(Review)
  const foundReview = await reviewRepository.findOneBy({ id: id })
  if (foundReview) {
    return await reviewRepository.delete({ id: id })
  } else {
    throw new NotFoundError()
  }
}

export default {
  getAllByUser,
  updateOne,
  deleteOne,
  getAllByProduct,
  createOne,
}
