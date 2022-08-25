import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { Box } from '@mui/material'

import { useAppDispatch } from '../hooks/appHooks'
import {
  createUser,
  loginByToken,
  userLogin,
} from '../redux/reducers/userReducer'
import { User } from '../types/user'
import axios from '../axios/axios'

const LoginButton = () => {
  const dispatch = useAppDispatch()

  return (
    <Box sx={{ mt: '2em' }}>
      <GoogleLogin
        width='300px'
        theme='filled_blue'
        shape='pill'
        size='large'
        text='continue_with'
        onSuccess={async (credentialResponse) => {
          if ('credential' in credentialResponse) {
            const response: any = jwt_decode(
              credentialResponse.credential as string
            )
            const user: Partial<User> = {
              firstName: response.given_name,
              lastName: response.family_name,
              email: response.email,
              avatar: response.picture,
              password: '1234',
              role: 'buyer',
            }
            try {
              const res = await axios.post('/auth/findUser', {
                email: user.email,
              })
              const userToken = await res.data
              localStorage.setItem('userToken', userToken)
              dispatch(loginByToken())
            } catch (e) {
              dispatch(createUser(user))
              dispatch(userLogin({ email: response.email, password: '1234' }))
              console.log(e)
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
