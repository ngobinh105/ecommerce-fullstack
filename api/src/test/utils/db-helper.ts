import { CustomDataSource } from '../../database'

const testdb = new CustomDataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: ['./src/entity/*'],
  logging: false,
  synchronize: true,
  migrations: [],
  subscribers: ['./src/subscribers/*'],
})

export default testdb
