import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  NewProduct,
  Pagination,
  Product,
  ProductReducerType,
  TypedUpdateProduct,
} from '../../types/product'

const initalState: ProductReducerType = {
  productList: [],
  product: <Product>{},
}

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async ({ offset, limit }: Pagination) => {
    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      )
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchSingleProduct = createAsyncThunk(
  'fetchSingleProduct',
  async (productId: number) => {
    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      )
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (updateProduct: TypedUpdateProduct) => {
    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${updateProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updateProduct.update),
        }
      )
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: number) => {
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
      return productId
    } catch (error) {
      console.log(error)
    }
  }
)

export const addProduct = createAsyncThunk(
  'addProduct',
  async (product: NewProduct) => {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const productSlicer = createSlice({
  name: 'product',
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productList = action.payload
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedList = state.productList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
        state.productList = updatedList
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (item) => item.id !== action.payload
        )
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload)
      })
  },
})

export default productSlicer.reducer
