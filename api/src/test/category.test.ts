import app from '../app.js'
import database from '../database.js'
import dbconfig from './utils/testdb'
import { Category } from '../entity/Category.js'

import request from 'supertest'
import { User } from '../entity/User.js'
import { user1 } from './fixtures/user.js'
import { category1 } from './fixtures/product.js'

beforeAll(async () => {
  await database.connect(dbconfig)
  await database.AppDataSource.getRepository(User).save(user1)
  await database.AppDataSource.getRepository(Category).save(category1)
})
afterAll(async () => {
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Category)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .execute()
})

describe('test category controller', () => {
  test('this should create a new category with admin right', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })

    const response = await request(app)
      .post('/categories')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${signIn.body}`)
      .field('name', 'Shoes')
      .attach('image', `${__dirname}/images/test-image.png`)
    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Shoes')
  })
  test('this should get all categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
  })
  test('this should get category by id', async () => {
    const category = await database.AppDataSource.getRepository(
      Category
    ).findOneBy({ name: 'Shoes' })
    const response = await request(app).get(`/categories/${category?.id}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Shoes')
  })
  test('this should update category with admin right', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })
    const category = await database.AppDataSource.getRepository(
      Category
    ).findOneBy({ name: 'Clothes' })
    const updateRes = await request(app)
      .put(`/categories/${category?.id}`)
      .set('Authorization', `Bearer ${signIn.body}`)
      .set('Accept', 'application/json')
      .send({ name: 'Accessories' })

    expect(updateRes.status).toBe(200)
    expect(updateRes.body.name).toBe('Accessories')
  })
  test('this should delete category with admin right', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })
    const category = await database.AppDataSource.getRepository(
      Category
    ).findOneBy({ name: 'Shoes' })
    const deteleRes = await request(app)
      .delete(`/categories/${category?.id}`)
      .set('Authorization', `Bearer ${signIn.body}`)

    expect(deteleRes.status).toBe(204)
  })
})
