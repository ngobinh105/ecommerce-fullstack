import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom.js'
import { CartItem } from './CartItem.js'
import { Category } from './Category.js'
import { Review } from './Review.js'

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
  category: Category | null

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  reviews: Review[] | null

  @OneToMany(() => CartItem, (cartItems) => cartItems.product)
  cartItems: CartItem[] | null
}
