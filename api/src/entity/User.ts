import { Entity, Column, OneToMany } from 'typeorm'
import bcrypt from 'bcrypt'

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

  @OneToMany(() => Address, (address) => address.userId, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  address: Address[]

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
