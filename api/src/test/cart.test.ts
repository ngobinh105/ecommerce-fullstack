import app from '../app'
import database from '../database'
import dbconfig from './utils/testdb'

import request from 'supertest'
import { User } from '../entity/User'
import { user1 } from './fixtures/user'
import { product1 } from './fixtures/product'
import { Product } from '../entity/Product'
import { Category } from '../entity/Category'

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
    .from(Product)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Category)
    .execute()
})

describe('test review controller', () => {
  test('this should add a new cart item ', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({ title: 'product test 1' })
    const response = await request(app)
      .post(`/users/${user?.id}/carts`)
      .set('Accept', 'application/json')
      .send({
        productId: product?.id,
        userId: user?.id,
      })
    expect(response.status).toBe(201)
    expect(response.body.quantity).toBe(1)
  })
  test('this should get all cart items by user', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const res = await request(app).get(`/users/${user?.id}/carts`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })
  test('this should update cart ', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })

    const updateRes = await request(app)
      .put(`/users/${user?.id}/carts/${user?.cartItems[0].id}`)
      .set('Accept', 'application/json')
      .send({ quantity: 2 })
    expect(updateRes.status).toBe(200)
    expect(updateRes.body.quantity).toBe(2)
  })
  test('this should delete a cart item', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const deleteRes = await request(app).delete(
      `/users/${user?.id}/carts/${user?.cartItems[0].id}`
    )

    expect(deleteRes.status).toBe(204)
  })
})
