import productReducer, {
  fetchProducts,
  updateProduct,
  deleteProduct,
  fetchSingleProduct,
  addProduct,
} from '../../redux/reducers/productReducer'
import { Product } from '../../types/product'
import createTestStore from '../utils/testStore'
import { products } from '../utils/products'
import { mockServer } from '../utils/mockServer'

const initialState: {
  productList: Product[]
  product: Product
} = {
  productList: [],
  product: <Product>{},
}

const fakeAction = {
  type: 'testing initial state',
  payload: {},
}

const updatedProduct = {
  id: '2',
  update: {
    title: 'New Title',
    price: 200,
  },
}
let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
  mockServer.listen()
})
afterEach(() => mockServer.resetHandlers())

afterAll(() => mockServer.close())

describe('Test product reducer actions', () => {
  test('this should have initial state', () => {
    const state = productReducer(initialState, fakeAction)
    expect(state.productList.length).toBe(0)
    expect(state.product).toBeNull
  })
  test('this should fetch all products and save to test', async () => {
    await store.dispatch(fetchProducts())
    const state = store.getState().productReducer
    expect(state.productList.length).toBeGreaterThan(1)
  })
  test('this should add a product to api', async () => {
    await store.dispatch(addProduct(products[0]))
    expect(store.getState().productReducer.productList.length).toBe(1)
  })
  test('this should update the product', async () => {
    await store.dispatch(addProduct(products[1]))
    await store.dispatch(updateProduct(updatedProduct))
    const state = store.getState().productReducer
    expect(state.productList.find((item) => item.id === '2')?.title).toEqual(
      'New Title'
    )
  })
  test('this should delete the product', async () => {
    await store.dispatch(addProduct(products[1]))
    await store.dispatch(deleteProduct('2'))
    const state = store.getState().productReducer
    expect(state.productList.length).toBe(0)
  })
  test('this should fetch only a product', async () => {
    await store.dispatch(fetchSingleProduct('4'))
    const state = store.getState().productReducer
    expect(state.product).not.toBeNull
  })
})
