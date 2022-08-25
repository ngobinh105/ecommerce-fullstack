import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Input,
  ImageList,
  ImageListItem,
} from '@mui/material'

import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/appHooks'

import { addToCart } from '../redux/reducers/cartReducer'
import { fetchSingleProduct } from '../redux/reducers/productReducer'

const SingleProduct = () => {
  let { productId } = useParams()
  const dispatch = useAppDispatch()
  const [productQuantity, setProductQuantity] = useState(1)
  const product = useAppSelector((state) => state.productReducer.product)
  const onAdd = () => {
    dispatch(addToCart({ ...product, quantity: productQuantity }))
  }
  useEffect(() => {
    dispatch(fetchSingleProduct(Number(productId)))
  }, [productId])
  return (
    <Box className='single__product__container'>
      <Grid container spacing={4}>
        <Grid item xs={0} md={6}>
          <ImageList variant='masonry' cols={2} gap={8} rowHeight={350}>
            {product.images?.map((item) => (
              <ImageListItem key={item} rows={1}>
                <img
                  src={`${item}?w=500&fit=crop&auto=format`}
                  srcSet={`${item}?w=500&fit=crop&auto=format&dpr=2 2x`}
                  alt={'product'}
                  loading='lazy'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={0} md={6}>
          <Box className='right__content'>
            <Typography variant='h3'>{product.title}</Typography>
            <Typography variant='h3'>€{product.price}</Typography>
            <Typography variant='body1' sx={{ overflow: 'visible' }}>
              Description: {product.description}
            </Typography>
            <Typography>
              Quantity:{' '}
              <Input
                type='number'
                value={productQuantity}
                onChange={(e) => setProductQuantity(Number(e.target.value))}
                sx={{ width: '40px' }}
              ></Input>
            </Typography>
            <Button onClick={onAdd} color='secondary' variant='contained'>
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SingleProduct
