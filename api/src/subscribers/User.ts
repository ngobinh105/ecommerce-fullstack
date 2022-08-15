import { User } from '../entity/User'

import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'
import bcrypt from 'bcrypt'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }
  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await bcrypt.hash(event.entity.password, 10)
  }
  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity) {
      if (event.entity.password !== event.databaseEntity.password) {
        event.entity.password = await bcrypt.hash(event.entity.password, 10)
      }
    }
  }
}
