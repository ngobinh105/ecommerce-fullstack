import categoryReducer, {
  fetchAllCategories,
  fetchProductsByCategory,
} from '../../redux/reducers/categoryReducer'
import { CategoryReducerType } from '../../types/product'

import createTestStore from '../utils/testStore'

const initalState: CategoryReducerType = {
  categoryList: [],
  sortedProductList: [],
}

const testAction = {
  type: 'test',
  payload: {},
}

let store = createTestStore()

beforeAll(() => {
  store = createTestStore()
})

describe('test category reducer', () => {
  test('test initial state', () => {
    const state = categoryReducer(initalState, testAction)
    expect(state.categoryList.length).toBe(0)
    expect(state.sortedProductList.length).toBe(0)
  })
  test('should fetch all categories', async () => {
    await store.dispatch(fetchAllCategories())
    const state = store.getState().categoryReducer
    expect(state.categoryList.length).toBeGreaterThan(1)
  })
  test('should fetch all products by categories', async () => {
    await store.dispatch(fetchProductsByCategory(1))
    const state = store.getState().categoryReducer
    const checkCategory = state.sortedProductList.every(
      (item) => item.category.id === 1
    )
    expect(state.sortedProductList.length).toBeGreaterThan(1)
    expect(checkCategory).toBeTruthy()
  })
})
