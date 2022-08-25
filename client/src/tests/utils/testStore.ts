import { configureStore } from '@reduxjs/toolkit'

import productReducer from '../../redux/reducers/productReducer'
import cartReducer from '../../redux/reducers/cartReducer'
import userReducer from '../../redux/reducers/userReducer'
import categoryReducer from '../../redux/reducers/categoryReducer'

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      productReducer,
      cartReducer,
      userReducer,
      categoryReducer,
    },
  })
  return store
}

export default createTestStore
