import React from 'react'

import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import { createUser, userLogin } from '../redux/reducers/userReducer'
import { User } from '../types/user'
import { Box } from '@mui/material'

const LoginButton = () => {
  const dispatch = useAppDispatch()

  const userList = useAppSelector((state) => state.userReducer.userList)

  return (
    <Box sx={{ mt: '2em' }}>
      <GoogleLogin
        width='300px'
        theme='filled_blue'
        shape='pill'
        size='large'
        text='continue_with'
        onSuccess={(credentialResponse) => {
          if ('credential' in credentialResponse) {
            const response: any = jwt_decode(
              credentialResponse.credential as string
            )
            const user: Partial<User> = {
              name: response.name,
              email: response.email,
              avatar: response.picture,
              password: '1234',
            }
            if (userList.some((item) => item.email === user.email)) {
              const existedUser = userList.find(
                (item) => item.email === user.email
              )
              if (existedUser) {
                dispatch(
                  userLogin({
                    email: existedUser.email,
                    password: existedUser.password,
                  })
                )
              }
            } else {
              dispatch(createUser(user))
              dispatch(userLogin({ email: response.email, password: '1234' }))
            }
          }
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        useOneTap
      />
    </Box>
  )
}

export default LoginButton
