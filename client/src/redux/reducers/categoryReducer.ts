import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryReducerType } from '../../types/product'

const initalState: CategoryReducerType = {
  categoryList: [],
  sortedProductList: [],
}

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async () => {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories')
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'fetchProductsByCategory',
  async (categoryId: number) => {
    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      )
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const categorySlicer = createSlice({
  name: 'category',
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoryList = action.payload
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.sortedProductList = action.payload
      })
  },
})

export default categorySlicer.reducer
