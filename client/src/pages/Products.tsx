import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'

import { deleteProduct, fetchProducts } from '../redux/reducers/productReducer'

import {
  Box,
  Grid,
  Button,
  Typography,
  Pagination,
  PaginationItem,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'

import { addToCart } from '../redux/reducers/cartReducer'
import { fetchAllCategories } from '../redux/reducers/categoryReducer'
import { Product } from '../types/product'
import { Link } from 'react-router-dom'

const Products = () => {
  let navigate = useNavigate()

  const dispatch = useAppDispatch()

  const products = useAppSelector((state) => state.productReducer.productList)
  const categories = useAppSelector(
    (state) => state.categoryReducer.categoryList
  )
  const user = useAppSelector((state) => state.userReducer.user)

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(15)

  const totalQuantity = products.length
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const changeCategory = (id: number) => {
    navigate(`categories/${id}`, { replace: true })
  }

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchAllCategories())
  }, [loading])

  return (
    <Box className='container'>
      <Box className='category__container'>
        <Box
          sx={{
            width: '100%',
            boxShadow: '10px 10px 8px #888888',
            border: '1px solid black',
            bgcolor: 'primary.main',
          }}
        >
          <List>
            <ListItemText
              primary='Categories'
              sx={{ marginLeft: '1em', marginTop: '0' }}
            ></ListItemText>
            <Divider />
            {categories.map((category) => (
              <ListItemButton
                key={category.id}
                sx={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}
                onClick={() => changeCategory(category.id)}
              >
                <ListItemText
                  primary={`${category.name} (${
                    products
                      ? products?.filter(
                          (item) => item.category.id === category.id
                        ).length
                      : 0
                  })`}
                ></ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>
      <Box className='product__container'>
        <Grid container spacing={2} justifyContent='center'>
          {currentProducts.map((item) => (
            <Grid
              className='product__card'
              key={item.id}
              item
              xs={4}
              lg={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: '10px',
                padding: '10px',
              }}
            >
              <Card
                className='product__card'
                sx={{
                  maxWidth: 400,
                  height: '100%',
                  width: '100%',
                  bgcolor: 'primary.main',
                  borderRadius: '1rem',
                  a: { color: 'text.primary' },
                }}
              >
                <Link to={`${item.id}`}>
                  <CardMedia
                    component='img'
                    height='300'
                    image={item.images[0]}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item.title}
                    </Typography>
                    <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
                      €{item.price}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button
                    onClick={() => {
                      dispatch(addToCart({ ...item, quantity: 1 }))
                    }}
                    color='secondary'
                    variant='contained'
                  >
                    ADD CART
                  </Button>
                  {user?.role === 'admin' && (
                    <IconButton
                      size='large'
                      onClick={() => dispatch(deleteProduct(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          className='product__container__pagination'
          siblingCount={0}
          defaultPage={1}
          page={currentPage}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setCurrentPage(value)
            setLoading(!loading)
          }}
          count={Math.ceil(totalQuantity / productsPerPage)}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ChevronLeftIcon, next: ChevronRightIcon }}
              {...item}
            />
          )}
        />
      </Box>
    </Box>
  )
}

export default Products
