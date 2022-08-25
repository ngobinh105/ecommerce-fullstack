import React, { useEffect } from 'react'

import { Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import { fetchAllCategories } from '../redux/reducers/categoryReducer'

const Home = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const categories = useAppSelector(
    (state) => state.categoryReducer.categoryList
  )
  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [])
  return (
    <Box className='home__container'>
      <Box className='first__content'>
        <Box className='first__content--card'>
          <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
            Get the Best Products
          </Typography>
          <Typography variant='h5'>from our stores...</Typography>
          <Button
            onClick={() => {
              navigate('/products', { replace: true })
            }}
            variant='contained'
          >
            GO SHOPPING
          </Button>
        </Box>
      </Box>
      <Box className='second__content'>
        <Typography component='div' variant='h3' sx={{ padding: '1em' }}>
          Explore Our Shopping Categories
        </Typography>
        <Grid container spacing={4} justifyContent='center'>
          {categories.map((item) => (
            <Grid key={item.id} item xs={6} lg={4}>
              <Paper
                className='category__card'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '25px',
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => navigate(`categories/${item.id}`)}
              >
                <Typography variant='h4' sx={{ padding: '2em' }}>
                  {item.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className='home__footer'>
        <Box className='footer__left'>
          <Typography variant='body1'>
            @Copyright All Rights Reserved 2022
          </Typography>
        </Box>
        <Box className='footer__right'>
          <Typography>Contact us</Typography>
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
