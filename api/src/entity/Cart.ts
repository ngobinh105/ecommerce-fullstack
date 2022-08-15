import { Column, Entity, OneToOne } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom'
import { User } from './User'

@Entity()
export class Cart extends BaseEntityCustom {
  @Column('simple-array')
  products: string[]

  @OneToOne(() => User, (user) => user.cart)
  user: User
}
