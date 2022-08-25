import {
  Box,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material'

import React, { useState } from 'react'

import { useAppDispatch } from '../hooks/appHooks'

import { userLogin } from '../redux/reducers/userReducer'

import LoginButton from './LoginButton'

const SignInModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clearInput = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = () => {
    dispatch(userLogin({ email, password }))
    clearInput()
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
          <Typography variant='h4'>Sign In</Typography>
          <form
            className='signin__modal__form'
            action='submit'
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <FormControl>
              <InputLabel htmlFor='email'>Email address</InputLabel>
              <Input
                id='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
          <LoginButton />
        </Box>
      </Modal>
    </Box>
  )
}

export default SignInModal
