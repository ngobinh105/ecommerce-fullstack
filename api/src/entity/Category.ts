import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntityCustom } from './BaseEntityCustom'
import { Product } from './Product'

@Entity()
export class Category extends BaseEntityCustom {
  @Column()
  name: string

  @Column()
  image: number

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products: Product[]
}
