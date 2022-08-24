import database from '../database.js'
import app from '../app.js'
import request from 'supertest'
import { User } from '../entity/User.js'
import { Product } from '../entity/Product.js'
import { category1 } from './fixtures/product.js'
import { user1 } from './fixtures/user.js'
import { Category } from '../entity/Category.js'
import dbconfig from './utils/testdb.js'

beforeAll(async () => {
  await database.connect(dbconfig)
  await database.AppDataSource.getRepository(Category).save(category1)
  await database.AppDataSource.getRepository(User).save(user1)
  jest.setTimeout(20000)
})
afterAll(async () => {
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Product)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .execute()
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(Category)
    .execute()
})
describe('test product controller', () => {
  test('this should create a new product', async () => {
    const category = await database.AppDataSource.getRepository(
      Category
    ).findOneBy({
      name: 'Clothes',
    })
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })
    const response = await request(app)
      .post('/products')
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${signIn.body}`)
      .field('title', 'Test product')
      .field('price', '50')
      .field('description', 'this product is for testing')
      .field('stock', '50')
      .field('categoryId', `${category ? category.id : ''}`)
      .attach('images', `${__dirname}/images/test-image.png`)
      .attach('images', `${__dirname}/images/test-image.png`)
      .attach('images', `${__dirname}/images/test-image.png`)
    expect(response.status).toBe(201)
  })
  test('this should get a product by id', async () => {
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({
      title: 'Test product',
    })
    const response = await request(app).get(`/products/${product?.id}`)
    expect(response.status).toBe(200)
    expect(response.body.title).toBe(product?.title)
  })
  test('this should update products with admin role', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })

    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({
      title: 'Test product',
    })
    const updateProduct = await request(app)
      .put(`/products/${product?.id}`)
      .set('Authorization', `Bearer ${signIn.body}`)
      .set('Accept', 'application/json')
      .send({ stock: '200', price: '20', description: 'another test desc' })
    expect(updateProduct.status).toBe(200)
    expect(updateProduct.body.description).toContain('another test desc')
  })
  test('this should delete a product with admin auth', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })
    const product = await database.AppDataSource.getRepository(
      Product
    ).findOneBy({
      title: 'Test product',
    })
    const deleteReq = await request(app)
      .delete(`/products/${product?.id}`)
      .set('Authorization', `Bearer ${signIn.body}`)
    expect(deleteReq.status).toBe(204)
  })
})
