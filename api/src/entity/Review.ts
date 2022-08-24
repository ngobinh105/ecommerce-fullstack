import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom.js'
import { User } from './User.js'
import { Product } from './Product.js'

@Entity()
export class Review extends BaseEntityCustom {
  @Column({
    type: 'varchar',
  })
  review: string
  @Column({
    enum: [1, 2, 3, 4, 5],
  })
  rate: number
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: User | null

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product | null
}
