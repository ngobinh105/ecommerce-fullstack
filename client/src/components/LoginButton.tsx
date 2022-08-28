import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../hooks/appHooks'
import {
  createUser,
  loginByToken,
  userLogin,
} from '../redux/reducers/userReducer'
import { User } from '../types/user'
import axios from '../axios/axios'

const LoginButton = ({ ...props }) => {
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
              password: '123456',
              role: 'buyer',
            }
            try {
              const res = await axios.post('/auth/findUser', {
                email: response.email,
              })
              const userToken = await res.data
              localStorage.setItem('userToken', userToken)
              dispatch(loginByToken())
              props.handleClose()
            } catch (e) {
              dispatch(createUser(user))
              setTimeout(() => {
                dispatch(
                  userLogin({ email: response.email, password: '123456' })
                )
                props.handleClose()
              }, 2500)
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
