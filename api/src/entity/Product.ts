import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom'
import { CartItem } from './CartItem'
import { Category } from './Category'
import { Review } from './Review'

@Entity()
export class Product extends BaseEntityCustom {
  @Column({
    unique: true,
    type: 'varchar',
  })
  title: string

  @Column()
  price: number

  @Column()
  description: string

  @Column({
    default: 0,
  })
  discount: number

  @Column()
  stock: number

  @Column({ array: true, type: 'varchar' })
  images: string[]

  @ManyToOne(() => Category, (category) => category.products, {
    cascade: true,
    eager: true,
    onDelete: 'NO ACTION',
  })
  @JoinTable()
  category: Category

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  reviews: Review[]

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  cartItems: CartItem[]
}
