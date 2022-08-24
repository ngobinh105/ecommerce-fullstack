import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntityCustom } from './BaseEntityCustom.js'
import { Product } from './Product.js'
import { User } from './User.js'

@Entity()
export class CartItem extends BaseEntityCustom {
  @Column({ default: 1 })
  quantity: number

  @ManyToOne(() => Product, (product) => product.cartItems, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  product: Product | null

  @ManyToOne(() => User, (user) => user.cartItems)
  @JoinColumn()
  user: User | null
}
