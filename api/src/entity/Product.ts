import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom'
import { Category } from './Category'
import { Review } from './Review'

@Entity()
export class Product extends BaseEntityCustom {
  @Column()
  title: string

  @Column()
  price: number

  @Column()
  description: string

  @Column()
  discount: number

  @Column()
  quantity: number

  @Column('simple-array')
  images: string[]

  @Column()
  avatar: string

  @ManyToOne(() => Category, {
    cascade: true,
    eager: true,
    onDelete: 'NO ACTION',
  })
  @JoinTable()
  category: Category

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[]
}
