import React, { useEffect } from 'react'
import { useAppSelector } from '../hooks/appHooks'

import { Box, Avatar, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const user = useAppSelector((state) => state.userReducer.user)
  let navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (Object.keys(user).length === 0) navigate('/', { replace: true })
    }
  }, [user])
  return (
    <Box className='profile' sx={{ bgcolor: 'background.default' }}>
      <Box className='profile__container' sx={{ bgcolor: 'primary.main' }}>
        <Box className='profile__card--header'>
          <Avatar
            alt={user?.name}
            src={user?.avatar}
            sx={{ width: '100px', height: '100px' }}
          />
          <Typography variant='h4'>{user?.name}</Typography>
        </Box>

        <form action='submit' className='profile__card--form'>
          <Box>
            <TextField
              label='Name'
              variant='standard'
              defaultValue={user?.name}
              required
            />
          </Box>
          <Box>
            <TextField
              label='Email'
              variant='standard'
              defaultValue={user?.email}
              disabled={true}
            />
          </Box>
          <Box>
            <TextField
              label='Role'
              variant='standard'
              defaultValue={user?.role}
              disabled={true}
            />
          </Box>
          <Box>
            <Button variant='contained' color='secondary'>
              Save Update
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Profile
