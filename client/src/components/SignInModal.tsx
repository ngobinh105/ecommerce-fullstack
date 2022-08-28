import {
  Box,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAppDispatch } from '../hooks/appHooks'
import {
  createUser,
  userLogin,
  addUserByFormData,
} from '../redux/reducers/userReducer'
import LoginButton from './LoginButton'
import customHooks from '../hooks/customHooks'
import { userSchema } from '../validation/userSchema'
import { UserFormData } from '../types/user'

const SignInModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [signIn, setSignIn] = useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { clearInput: emailClear, ...email } = customHooks.useField('text')
  const { clearInput: passwordClear, ...password } =
    customHooks.useField('password')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  })

  const clear = () => {
    emailClear()
    passwordClear()
  }
  const handleLoginSubmit = () => {
    dispatch(userLogin({ email: email.value, password: password.value }))
    clear()
    handleClose()
  }
  const handleSignUpSubmit = (data: UserFormData) => {
    const signUpForm = new FormData()
    signUpForm.append('firstName', data.firstName)
    signUpForm.append('lastName', data.lastName)
    signUpForm.append('email', data.email)
    signUpForm.append('password', data.password)
    signUpForm.append('avatar', data.avatar[0])
    dispatch(addUserByFormData(signUpForm))
    reset()
    handleClose()
  }
  return (
    <Box>
      <Button
        onClick={handleOpen}
        color='secondary'
        sx={{ fontWeight: 'bold' }}
      >
        Sign In
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          className='signin__modal__container'
          sx={{ bgcolor: 'background.default', color: 'black' }}
        >
          <Box>
            <Button onClick={() => setSignIn(true)}>Sign In</Button>
            <Button onClick={() => setSignIn(false)}>Sign Up</Button>
          </Box>
          <Box sx={{ display: signIn ? 'block' : 'none' }}>
            <form
              className='signin__modal__form'
              action='submit'
              onSubmit={(e) => {
                e.preventDefault()
                handleLoginSubmit()
              }}
            >
              <FormControl>
                <InputLabel htmlFor='email'>Email address</InputLabel>
                <Input id='email' {...email} />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='password-login'>Password</InputLabel>
                <Input id='password-login' {...password} />
              </FormControl>
              <Button type='submit' color='secondary' variant='contained'>
                Log in
              </Button>
            </form>
            <Typography
              component='a'
              sx={{
                textDecoration: 'underline',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              Forgot your password?
            </Typography>
            <LoginButton handleClose={handleClose} />
          </Box>
          <Box sx={{ display: !signIn ? 'block' : 'none' }}>
            <form
              action='submit'
              className='signin__modal__form'
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(handleSignUpSubmit)
              }}
            >
              <FormControl>
                <InputLabel htmlFor='email'>Email address</InputLabel>
                <Input id='email' {...register('email')} />
                <FormHelperText error={true}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                />
                <FormHelperText error={true}>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='passwordConfirm'>
                  Confirm Password
                </InputLabel>
                <Input
                  id='passwordConfirm'
                  type='password'
                  {...register('passwordConfirm')}
                />
                <FormHelperText error={true}>
                  {errors.passwordConfirm?.message}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='firstname'>First Name</InputLabel>
                <Input id='firstname' {...register('firstName')} />
                <FormHelperText error={true}>
                  {errors.firstName?.message}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='lastname'>Last Name</InputLabel>
                <Input id='lastname' {...register('lastName')} />
                <FormHelperText error={true}>
                  {errors.lastName?.message}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor='avatar'>Avatar</InputLabel>
                <Input id='avatar' type='file' {...register('avatar')} />
                <FormHelperText error={true}>
                  {errors.avatar?.message}
                </FormHelperText>
              </FormControl>
              <Button type='submit'>Sign up</Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default SignInModal
