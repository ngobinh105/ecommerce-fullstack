import database from '../database'
import app from '../app'
import request from 'supertest'

beforeAll(async () => {
  database.connect({
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
  await database.init()
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
    console.log(response.body)
    expect(response.status).toBe(201)
  })
})
