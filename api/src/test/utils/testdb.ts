import { DataSourceOptions } from 'typeorm'

const dbconfig = {
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
} as DataSourceOptions

export default dbconfig
