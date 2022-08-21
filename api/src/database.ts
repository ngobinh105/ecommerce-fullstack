import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'

export class CustomDataSource {
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
  constructor(
    public options: DataSourceOptions = {
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
    }
  ) {
    this.AppDataSource = new DataSource(options)
  }
  init() {
    return this.AppDataSource.initialize()
  }
  close() {
    return this.AppDataSource.dropDatabase()
  }
}

export default new CustomDataSource()
