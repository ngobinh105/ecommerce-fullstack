import cartReducer, {
  addToCart,
  deleteItem,
} from '../../redux/reducers/cartReducer'

import { CartType } from '../../types/cart'

const initialState: CartType = {
  cart: [],
}

const fakeAction = {
  type: 'testing initial state',
  payload: {},
}

const testProduct = {
  id: '4',
  title: 'Tasty Wooden Chicken',
  price: 624,
  stock: 500,
  discount: 0,
  description:
    'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
  category: {
    id: '3',
    name: 'Furniture',
    image: 'https://api.lorem.space/image/furniture?w=640&h=480&r=8695',
    createdAt: '20200',
    updatedAt: '202020',
  },
  images: [
    'https://api.lorem.space/image/furniture?w=640&h=480&r=6278',
    'https://api.lorem.space/image/furniture?w=640&h=480&r=1747',
    'https://api.lorem.space/image/furniture?w=640&h=480&r=1592',
  ],
  createdAt: '202020',
  updatedAt: '202020',
}
const testProductWithQuantity = { ...testProduct, quantity: 3 }
const currentState: CartType = {
  cart: [{ ...testProduct, quantity: 1 }],
}
const addToCartAction = {
  type: 'cart/addToCart',
  payload: testProduct,
}

const deleteAction = {
  type: 'cart/deleteItem',
  payload: testProduct.id,
}

describe('Test cart reducer actions', () => {
  test('test if cart have initial state', () => {
    const state = cartReducer(initialState, fakeAction)
    expect(state.cart.length).toBe(0)
  })
  test('this should add product to cart with quantity 1', () => {
    const state = cartReducer(initialState, addToCartAction)
    expect(state.cart.length).toBe(1)
    expect(state.cart[0].quantity).toBe(1)
  })
  test('test if add same product will increase the quantity by 1', () => {
    const state = cartReducer(currentState, addToCartAction)
    expect(state.cart[0].quantity).toBe(2)
  })
  test('test if add same product with given quantity will increase the quantity', () => {
    const state = cartReducer(currentState, {
      ...addToCartAction,
      payload: testProductWithQuantity,
    })
    expect(state.cart[0].quantity).toBe(4)
  })
  test('this should delete the item', () => {
    const state = cartReducer(currentState, deleteAction)
    expect(state.cart.length).toBe(0)
  })
})
