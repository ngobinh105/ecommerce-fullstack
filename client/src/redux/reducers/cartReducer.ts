import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartProduct, CartType } from '../../types/cart'

const initialState: CartType = {
  cart: [],
}

const cartSlicer = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        if (action.payload.quantity > 1) {
          state.cart[itemIndex].quantity =
            state.cart[itemIndex].quantity + action.payload.quantity
        }
        if (
          action.payload.quantity === undefined ||
          action.payload.quantity === 0 ||
          action.payload.quantity === 1
        ) {
          state.cart[itemIndex].quantity++
        }
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity ? action.payload.quantity : 1,
        })
      }
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    decrement(state, action: PayloadAction<number>) {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      )
      if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity--
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload)
      }
    },
  },
  extraReducers: (builder) => {},
})

export const { addToCart, deleteItem, decrement } = cartSlicer.actions
export default cartSlicer.reducer
