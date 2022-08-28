import React, { useContext } from 'react'
import { Box, useTheme, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { useAppSelector } from '../hooks/appHooks'
import CartModal from './CartModal'
import SignInModal from './SignInModal'
import UserMenu from './UserMenu'
import ThemeContext from '../theme/ThemeContext'

const NavBar = () => {
  const user = useAppSelector((state) => state.userReducer.user)
  console.log('user', user)
  const theme = useTheme()
  const colormode = useContext(ThemeContext)
  return (
    <Box className='navbar' sx={{ bgcolor: 'primary.main' }}>
      <Box sx={{ a: { color: 'text.primary' } }}>
        <Link to={''}>Home</Link>
        <Link to={'products'}>Product</Link>
      </Box>
      <Box className='navbar--righticons'>
        <CartModal />
        {user?.id ? <UserMenu></UserMenu> : <SignInModal />}
        <IconButton
          onClick={() => {
            colormode.changeTheme()
          }}
        >
          {theme.palette.mode === 'light' ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}

export default NavBar
