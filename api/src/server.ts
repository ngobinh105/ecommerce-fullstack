import app from './app'
import database from './database'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
if (process.env.NODE_ENV === 'production') {
  database
    .connect({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['./dist/entity/*'],
      logging: false,
      synchronize: true,
      migrations: [],
      subscribers: ['./dist/subscribers/*'],
      ssl: {
        rejectUnauthorized: false,
      },
    })
    .then(() => {
      console.log('database is successfully initialized')
      app.listen(app.get('port'), () => {
        console.log('server is listening at port', app.get('port'))
      })
    })
} else {
  database
    .init()
    .then(() => {
      console.log('database is successfully initialized')
      app.listen(app.get('port'), () => {
        console.log('server is listening at port', app.get('port'))
      })
    })
    .catch((e) => console.log(e))
}
