import app from '../app.js'
import database from '../database.js'
import dbconfig from './utils/testdb.js'

import request from 'supertest'
import { User } from '../entity/User.js'
import { user1 } from './fixtures/user.js'
import { product1 } from './fixtures/product.js'
import { Product } from '../entity/Product.js'
import { Review } from '../entity/Review.js'
import { Category } from '../entity/Category.js'

beforeAll(async () => {
  await database.connect(dbconfig)
  await database.AppDataSource.getRepository(User).save(user1)
  await database.AppDataSource.getRepository(Product).save(product1)
})
afterAll(async () => {
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Review)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Product)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Category)
    .execute()
})

describe('test review controller', () => {
  test('this should create a new review ', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({ title: 'product test 1' })
    const response = await request(app)
      .post(`/users/${user?.id}/reviews`)
      .set('Accept', 'application/json')
      .send({
        review: 'this is a new review',
        rate: 5,
        productId: product?.id,
        userId: user?.id,
      })
    expect(response.status).toBe(201)
    expect(response.body.review).toBe('this is a new review')
  })
  test('this should get all reviews by user', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const res = await request(app).get(`/users/${user?.id}/reviews`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })
  test('this should get all reviews by product', async () => {
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({ title: 'product test 1' })
    const response = await request(app).get(`/products/${product?.id}/reviews`)
    expect(response.status).toBe(200)
  })
  test('this should update review ', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const review = await database.AppDataSource.getRepository(Review).findOneBy(
      {
        review: 'this is a new review',
      }
    )
    const updateRes = await request(app)
      .put(`/users/${user?.id}/reviews/${review?.id}`)
      .set('Accept', 'application/json')
      .send({ review: 'This is a updated review', rate: 4 })
    expect(updateRes.status).toBe(200)
    expect(updateRes.body.rate).toBe(4)
  })
  test('this should delete review', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const review = await database.AppDataSource.getRepository(Review).findOneBy(
      {
        review: 'This is a updated review',
      }
    )
    const deleteRes = await request(app).delete(
      `/users/${user?.id}/reviews/${review?.id}`
    )

    expect(deleteRes.status).toBe(204)
  })
})
