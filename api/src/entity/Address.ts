import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntityCustom } from './BaseEntityCustom'
import { User } from './User'

@Entity()
export class Address extends BaseEntityCustom {
  @Column({ enum: ['home', 'business', 'shipping', 'billing'] })
  addressType: string

  @Column()
  city: string

  @Column()
  country: string

  @Column()
  state: string

  @Column()
  street: string

  @Column()
  postalCode: string

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'SET NULL' })
  user: User
}
