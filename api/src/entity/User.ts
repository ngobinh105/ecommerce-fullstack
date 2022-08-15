import { Entity, Column, OneToMany } from 'typeorm'
import { Address } from './Address'

import { BaseEntityCustom } from './BaseEntityCustom'

@Entity()
export class User extends BaseEntityCustom {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    type: 'varchar',
    unique: true,
    length: 25,
  })
  username: string

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string

  @Column({
    select: false,
    type: 'varchar',
  })
  password: string

  @Column({
    enum: ['buyer', 'seller', 'admin'],
    default: 'user',
  })
  role: string

  @Column({
    type: 'bytea',
    nullable: false,
  })
  avatar: Buffer

  @OneToMany(() => Address, (address) => address.userId, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  address: Address[]
}
