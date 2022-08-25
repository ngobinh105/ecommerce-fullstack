import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/appHooks'
import {
  fetchAllCategories,
  fetchProductsByCategory,
} from '../redux/reducers/categoryReducer'
import {
  Grid,
  Box,
  Typography,
  Button,
  Pagination,
  PaginationItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
} from '@mui/material'

import { addToCart } from '../redux/reducers/cartReducer'
import { Product } from '../types/product'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteProduct } from '../redux/reducers/productReducer'
import { Link } from 'react-router-dom'

const Category = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const products = useAppSelector(
    (state) => state.categoryReducer.sortedProductList
  )
  const categories = useAppSelector(
    (state) => state.categoryReducer.categoryList
  )
  const user = useAppSelector((state) => state.userReducer.user)
  const { categoryId } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(15)
  const [allProducts, setAllProducts] = useState<Product[]>()

  const totalQuantity = products.length
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  const changeCategory = (id: number) => {
    navigate(`../${id}`, { replace: true })
  }
  const fetchProductsFromApi = async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products')
    const data = await res.json()
    setAllProducts(data)
  }
  useEffect(() => {
    dispatch(fetchProductsByCategory(Number(categoryId)))
    dispatch(fetchAllCategories())
    fetchProductsFromApi()
  }, [products])
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
                    allProducts
                      ? allProducts?.filter(
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
                <Link to={`/products/${item.id}`}>
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

export default Category
