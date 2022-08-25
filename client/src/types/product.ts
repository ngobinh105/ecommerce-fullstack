export interface Product {
  id: string
  title: string
  price: number
  description: string
  category: Category
  stock: number
  discount: number
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface TypedUpdateProduct {
  id: string
  update: Partial<Product>
}

export interface ProductReducerType {
  productList: Product[]
  product: Product
}

export interface CategoryReducerType {
  categoryList: Category[]
}

export interface NewProduct {
  title: string
  price: number
  description: string
  stock: number
  categoryId: number
  images: string[]
}
export interface NewCategory {
  name: string
  image: string
}
