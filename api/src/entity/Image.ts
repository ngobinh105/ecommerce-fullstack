import { Entity, Column } from 'typeorm'

import { BaseEntityCustom } from './BaseEntityCustom.js'

@Entity()
export class Image extends BaseEntityCustom {
  @Column({
    type: 'bytea',
    nullable: false,
  })
  imageData: Buffer
}
