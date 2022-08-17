import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntityCustom } from './BaseEntityCustom'
import { Product } from './Product'
import { User } from './User'

@Entity()
export class CartItem extends BaseEntityCustom {
  @Column({ default: 1 })
  quantity: number

  @ManyToOne(() => Product, (product) => product.cartItems, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn()
  user: User
}
