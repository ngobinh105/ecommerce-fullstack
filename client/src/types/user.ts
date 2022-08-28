export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'buyer' | 'admin' | 'seller'
  avatar: string
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export interface Address {
  addressType: 'home' | 'business' | 'shipping' | 'billing'
  city: string
  country: string
  state: string
  street: string
  postalCode: string
}
export interface UserLoginInfo {
  email: string
  password: string
}

export interface UserReducerType {
  userList: User[]
  user: User | undefined
}

export type UserFormData = {
  email: string
  password: string
  firstName: string
  lastName: string
  avatar: string
  passwordConfirm: string
}
