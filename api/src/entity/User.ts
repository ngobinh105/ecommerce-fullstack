import { Entity, Column, OneToMany, OneToOne, JoinTable } from 'typeorm'
import bcrypt from 'bcrypt'
import { IsEmail, Length, MinLength } from 'class-validator'

import { Address } from './Address'
import { BaseEntityCustom } from './BaseEntityCustom'
import { Cart } from './Cart'
import { Review } from './Review'

@Entity()
export class User extends BaseEntityCustom {
  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({
    type: 'varchar',
    unique: true,
  })
  @Length(8, 20)
  username: string

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  email: string

  @Column({
    select: false,
    type: 'varchar',
  })
  @MinLength(10, {
    message: 'Your password is too short',
  })
  password: string

  @Column({
    enum: ['buyer', 'seller', 'admin'],
    default: 'user',
  })
  role: string

  @Column({
    nullable: false,
    type: 'varchar',
  })
  avatar: string

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  addresses: Address[]

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart

  @OneToMany(() => Review, (review) => review.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  reviews: Review[]

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
