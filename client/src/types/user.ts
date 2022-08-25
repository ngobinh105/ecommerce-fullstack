export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'customer' | 'admin'
  avatar: string
}
export interface UserLoginInfo {
  email: string
  password: string
}

export interface UserReducerType {
  userList: User[]
  user: User | undefined
}
