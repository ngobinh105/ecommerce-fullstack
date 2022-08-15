import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom'
import { User } from './User'
import { Product } from './Product'

@Entity()
export class Review extends BaseEntityCustom {
  @Column()
  review: string

  @ManyToOne(() => User, (user) => user.reviews)
  user: User
  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product
}
