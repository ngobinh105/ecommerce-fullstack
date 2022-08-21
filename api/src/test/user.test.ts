import testdb from './utils/db-helper'
import app from '../app'
import request from 'supertest'

beforeAll(() => {
  testdb
    .init()
    .then(() => {
      console.log('database is successfully initialized')
      app.listen(app.get('port'), () => {
        console.log('server is listening at port', app.get('port'))
      })
    })
    .catch((e) => console.log(e))
})
afterAll(async () => {
  await testdb.close()
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
      .attach('avatar', 'src/test/images/test-image.png')
    expect(response.status).toBe(201)
  })
})
