import database from '../database'
import app from '../app'
import request from 'supertest'
import { User } from '../entity/User'
import { Product } from '../entity/Product'
import { product1, product2, product3, category1 } from './fixtures/product'
import { user1 } from './fixtures/user'
import { Category } from '../entity/Category'

beforeAll(async () => {
  await database.connect({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'admin',
    database: 'testing',
    entities: ['./src/entity/*'],
    logging: false,
    synchronize: true,
    migrations: [],
    subscribers: ['./src/subscribers/*'],
  })
  await database.AppDataSource.getRepository(Category).save(category1)
  await database.AppDataSource.getRepository(User).save(user1)
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
    const response = await request(app)
      .post('/products')
      .set('Content-Type', 'multipart/form-data')
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
    const response = await request(app).get(
      `/products/${product ? product.id : ''}`
    )
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
      .put(`/products/${product ? product.id : ''}`)
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
      .delete(`/products/${product ? product.id : ''}`)
      .set('Authorization', `Bearer ${signIn.body}`)
    console.log(deleteReq.body)
    expect(deleteReq.status).toBe(204)
  })
})
