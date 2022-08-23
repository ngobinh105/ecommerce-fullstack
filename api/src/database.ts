import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
class CustomDataSource {
  public AppDataSource: DataSource = new DataSource({
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
  init() {
    return this.AppDataSource.initialize()
  }
  close() {
    return this.AppDataSource.dropDatabase()
  }
  async connect(options: DataSourceOptions) {
    this.AppDataSource = new DataSource(options)
    return this.AppDataSource.initialize()
  }
}

const database = new CustomDataSource()

export default database
