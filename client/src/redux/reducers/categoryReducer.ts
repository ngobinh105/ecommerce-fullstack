import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'
import { CategoryReducerType, NewCategory } from '../../types/product'

const initalState: CategoryReducerType = {
  categoryList: [],
}

export const fetchAllCategories = createAsyncThunk(
  'fetchAllCategories',
  async () => {
    try {
      const res = await axios.get('/categories')
      const data = await res.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
export const addCategory = createAsyncThunk(
  'addCategory',
  async (category: NewCategory) => {
    try {
      const res = await axios.post('/categories', category)
      const data = await res.data
      return data
    } catch (e) {
      console.log(e)
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
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload)
      })
  },
})

export default categorySlicer.reducer
