export interface User {
  id: number
  email: string
  password: string
  name: string
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
