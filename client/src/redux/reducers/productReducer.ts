import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'
import {
  NewProduct,
  Product,
  ProductReducerType,
  TypedUpdateProduct,
} from '../../types/product'

const initalState: ProductReducerType = {
  productList: [],
  product: <Product>{},
}

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  try {
    const res = await axios.get('/products')
    const data = await res.data
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchSingleProduct = createAsyncThunk(
  'fetchSingleProduct',
  async (productId: string) => {
    try {
      const res = await axios.get(`/products/${productId}`)
      const data = await res.data
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
      const res = await axios.put(
        `/products/${updateProduct.id}`,
        updateProduct
      )
      const data = await res.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: string) => {
    try {
      await axios.delete(`/products/${productId}`)
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
      const res = await axios.post('/products', product)
      const data = await res.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
export const fetchProductsByCategory = createAsyncThunk(
  'getProductsByCategory',
  async (categoryId: string) => {
    try {
      const res = await axios.get(`/categories/${categoryId}/products`)
      const data = await res.data
      return data
    } catch (e) {
      console.log(e)
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
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productList = action.payload
      })
  },
})

export default productSlicer.reducer
