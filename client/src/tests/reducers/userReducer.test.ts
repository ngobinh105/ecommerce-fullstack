import userReducer, {
  fetchAllUsers,
  createUser,
  userLogin,
} from '../../redux/reducers/userReducer'
import { User, UserReducerType } from '../../types/user'
import createTestStore from '../utils/testStore'
import { mockServer } from '../utils/mockServer'

const initialState: UserReducerType = {
  userList: [],
  user: <User>{},
}

const fakeAction = {
  type: 'testing initial state',
  payload: {},
}

const testAcc = {
  email: 'john@mail.com',
  password: 'changeme',
}
const wrongCredentialAcc = {
  email: 'john@mail.com',
  password: 'changemeabc',
}

const newUser = {
  firstName: 'Binhaa',
  lastName: 'Ngo',
  email: 'binh@gmail.com',
  password: '12345',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=1874',
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
    const state = userReducer(initialState, fakeAction)
    expect(state.userList.length).toBe(0)
    expect(state.user).toBeNull
  })
  test('this should fetch all users and save to test', async () => {
    await store.dispatch(fetchAllUsers())
    const state = store.getState().userReducer
    expect(state.userList.length).toBeGreaterThan(0)
  })
  test('this should create a new user', async () => {
    await store.dispatch(createUser(newUser))
    const state = store.getState().userReducer
    const addedUser = state.userList.find(
      (item) => item.firstName === newUser.firstName
    )
    expect(addedUser).toBeDefined()
  })
  test('this should login and return user info', async () => {
    await store.dispatch(userLogin(testAcc))
    const state = store.getState().userReducer
    expect(state.user?.firstName).toBeDefined()
  })
  test('this should login fail with wrong credential', async () => {
    await store.dispatch(userLogin(wrongCredentialAcc))
    const state = store.getState().userReducer
    expect(state.user).toBeUndefined()
  })
})
