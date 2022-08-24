import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom.js'
import { Product } from './Product.js'

@Entity()
export class Category extends BaseEntityCustom {
  @Column()
  name: string

  @Column()
  image: string

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products: Product[] | null
}
