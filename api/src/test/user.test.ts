import database from '../database'
import app from '../app'
import request from 'supertest'
import { User } from '../entity/User'
import { user1, user2, user3 } from './fixtures/user'

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
  await database.AppDataSource.getRepository(User).save(user1)
  await database.AppDataSource.getRepository(User).save(user2)
  await database.AppDataSource.getRepository(User).save(user3)
})
afterAll(async () => {
  await database.AppDataSource.createQueryBuilder()
    .delete()
    .from(User)
    .execute()
})
describe('test user controller', () => {
  test('this should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Content-Type', 'multipart/form-data')
      .field('firstName', 'Binh')
      .field('lastName', 'Ngo')
      .field('email', 'binhngo1005@gmail.com')
      .field('password', 'testing')
      .field('phone', '0460399494')
      .field('addressType', 'home')
      .field('city', 'helsinki')
      .field('country', 'finland')
      .field('state', 'uusimaa')
      .field('postalCode', '00970')
      .field('street', 'Aleksanderinkatu 1B')
      .attach('avatar', `${__dirname}/images/test-image.png`)
    expect(response.status).toBe(201)
  })
  test('this should login the user and return the token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })
    expect(response.status).toBe(200)
    expect(response.body).toContain('ey')
  })
  test('this should get all users with admin role', async () => {
    const signIn = await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'testing@gmail.com', password: 'randompassword' })

    const getAllUsers = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${signIn.body}`)
    expect(getAllUsers.status).toBe(200)
    expect(getAllUsers.body).toHaveLength(4)
  })
  test('this should delete a user', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'testing@gmail.com',
    })
    const deleteReq = await request(app).delete(`/users/${user ? user.id : ''}`)
    expect(deleteReq.status).toBe(204)
  })
  test('this should update a user', async () => {
    const user = await database.AppDataSource.getRepository(User).findOneBy({
      email: 'binhngo1005@gmail.com',
    })
    const updateReq = await request(app)
      .put(`/users/${user ? user.id : ''}`)
      .set('Accept', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Dev',
      })
    expect(updateReq.status).toBe(200)
    expect(updateReq.body.firstName).toContain('John')
  })
})
