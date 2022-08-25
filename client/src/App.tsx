import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Product from './pages/Products'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import SingleProduct from './pages/SingleProduct'
import { useAppDispatch } from './hooks/appHooks'
import { loginByToken } from './redux/reducers/userReducer'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { createTheme, ThemeProvider, Box } from '@mui/material'
import { blueGrey, grey, deepOrange } from '@mui/material/colors'
import ThemeContext from './theme/ThemeContext'

function App() {
  const dispatch = useAppDispatch()
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const themecontext = {
    changeTheme: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }
  const userLogin = () => {
    if (localStorage.getItem('userToken')) {
      dispatch(loginByToken())
    } else {
      return undefined
    }
  }

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: deepOrange[200],
            },
            secondary: {
              main: grey[900],
            },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
            background: {
              default: deepOrange[50],
            },
          }
        : {
            primary: { main: blueGrey[500] },
            secondary: { main: blueGrey[50] },
            text: {
              primary: blueGrey[50],
              secondary: grey[50],
            },
            background: {
              default: blueGrey[200],
            },
          }),
    },
  })

  useEffect(() => {
    userLogin()
  }, [])
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID as string}>
      <ThemeContext.Provider value={themecontext}>
        <ThemeProvider theme={theme}>
          <Router>
            <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
              <NavBar />
              <Routes>
                <Route path='' element={<Home />}></Route>
                <Route path='products'>
                  <Route path='' element={<Product />}></Route>
                  <Route path=':productId' element={<SingleProduct />}></Route>
                </Route>
                <Route path='categories'>
                  <Route path=':categoryId' element={<Product />}></Route>
                </Route>
                <Route path='user' element={<Profile />}></Route>
              </Routes>
            </Box>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
    </GoogleOAuthProvider>
  )
}

export default App
