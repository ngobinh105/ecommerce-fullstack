import { Product } from '../../entity/Product.js'
import { Category } from '../../entity/Category.js'

export const category1 = new Category()
category1.name = 'Clothes'
category1.image = 'image.jpg'

export const product1 = new Product()
product1.title = 'product test 1'
product1.price = 50
product1.description = 'product description'
product1.stock = 500
product1.images = ['image1.jpg', 'image2.jpg', 'image3.jpg']
product1.category = category1
export const product2 = new Product()
product2.title = 'product test 2'
product2.price = 50
product2.description = 'product description 2'
product2.stock = 500
product2.images = ['image1.jpg', 'image2.jpg', 'image3.jpg']
product2.category = category1
export const product3 = new Product()
product3.title = 'product test 3'
product3.price = 50
product3.description = 'product description 3'
product3.stock = 500
product3.images = ['image1.jpg', 'image2.jpg', 'image3.jpg']
product3.category = category1
