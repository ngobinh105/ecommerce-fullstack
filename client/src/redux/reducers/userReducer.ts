import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'

import { User, UserLoginInfo, UserReducerType } from '../../types/user'

const initialState: UserReducerType = {
  userList: [],
  user: <User>{},
}

export const userLogin = createAsyncThunk(
  'userLogin',
  async (userInfo: UserLoginInfo) => {
    try {
      const res = await axios.post('/auth/login', userInfo)
      const authToken = await res.data
      if (authToken) {
        localStorage.setItem('userToken', JSON.stringify(authToken))
        const userResponse = await axios.get('/auth/profile', {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        const data = await userResponse.data

        return data
      }
      return undefined
    } catch (error) {
      console.log(error)
    }
  }
)

export const loginByToken = createAsyncThunk('loginByToken', async () => {
  try {
    const response = await axios.get('/auth/profile')
    const data = await response.data
    return data
  } catch (error) {
    console.log(error)
  }
})

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  try {
    const res = await axios.get('/users')
    const data = await res.data
    return data
  } catch (error) {
    console.log(error)
  }
})

export const createUser = createAsyncThunk(
  'createUser',
  async (newUser: Partial<User>) => {
    try {
      const res = await axios.post('/users', newUser)
      const data = await res.data
      return data
    } catch (error) {
      console.log(error)
    }
  }
)

const userSlicer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUser(state, action) {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(loginByToken.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userList.push(action.payload)
      })
  },
})

export const { clearUser } = userSlicer.actions
export default userSlicer.reducer
