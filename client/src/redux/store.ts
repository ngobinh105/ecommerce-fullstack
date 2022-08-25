import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import productReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import categoryReducer from './reducers/categoryReducer'

const preloadedState = () => {
  const cartItems = localStorage.getItem('cartItems')
  const cartObj =
    cartItems === null ? { cart: [] } : JSON.parse(cartItems as string)
  return {
    cartReducer: cartObj,
  }
}

export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    userReducer,
    categoryReducer,
  },
  preloadedState: preloadedState(),
})

store.subscribe(() => {
  localStorage.setItem(
    'cartItems',
    JSON.stringify(store.getState().cartReducer)
  )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
