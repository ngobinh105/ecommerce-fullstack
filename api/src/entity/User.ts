import { Entity, Column, OneToMany, OneToOne, JoinTable } from 'typeorm'
import bcrypt from 'bcrypt'
import { IsEmail, MinLength } from 'class-validator'

import { Address } from './Address.js'
import { BaseEntityCustom } from './BaseEntityCustom.js'
import { Review } from './Review.js'
import { CartItem } from './CartItem.js'

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
  @IsEmail()
  email: string

  @Column({
    type: 'varchar',
  })
  @MinLength(10, {
    message: 'Your password is too short',
  })
  password: string

  @Column({
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
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
  addresses: Address[] | null

  @OneToMany(() => CartItem, (cartItem) => cartItem.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  cartItems: CartItem[] | null

  @OneToMany(() => Review, (review) => review.user, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  reviews: Review[] | null

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}
