import React, { useState } from 'react'

import { Avatar, Menu, MenuItem, IconButton } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'

import { useNavigate } from 'react-router-dom'

import { clearUser } from '../redux/reducers/userReducer'
import { googleLogout } from '@react-oauth/google'

const UserMenu = () => {
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const openProfile = () => {
    setAnchorEl(null)
    navigate('/user', { replace: true })
  }
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.userReducer.user)

  const signOut = () => {
    localStorage.removeItem('userToken')
    setAnchorEl(null)
    dispatch(clearUser(undefined))
    navigate('/', { replace: true })
    googleLogout()
  }

  return (
    <div className='navbar--signedinicons'>
      <IconButton
        id='avatar-button'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt={user?.firstName} src={user?.avatar} />
      </IconButton>
      <Menu
        id='account-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'avatar-button',
        }}
      >
        <MenuItem onClick={openProfile}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu
