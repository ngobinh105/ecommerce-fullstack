export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Categories
  stock: number
  discount?: number
  images: string[]
}

export interface Categories {
  id: number
  name: string
  image: string
}

export interface TypedUpdateProduct {
  id: number
  update: Partial<Product>
}

export interface ProductReducerType {
  productList: Product[]
  product: Product
}

export interface CategoryReducerType {
  categoryList: Categories[]
  sortedProductList: Product[]
}

export interface NewProduct {
  title: string
  price: number
  description: string
  stock: number
  categoryId: number
  images: string[]
}
