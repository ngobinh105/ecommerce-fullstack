import React, { useState } from 'react'

import {
  Box,
  IconButton,
  Modal,
  Typography,
  Slide,
  Badge,
  Button,
} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

import { useAppSelector, useAppDispatch } from '../hooks/appHooks'
import { addToCart, deleteItem, decrement } from '../redux/reducers/cartReducer'
import { CartProduct } from '../types/cart'

const CartModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setChecked(!checked)
  }
  const handleClose = () => {
    setOpen(false)
    setChecked(!checked)
  }

  const cart = useAppSelector((state) => state.cartReducer.cart)

  const totalCartPrice = (arr: CartProduct[]): number => {
    const tempArr = []
    for (let i = 0; i < arr.length; i++) {
      tempArr.push(arr[i].quantity * arr[i].price)
    }
    return tempArr.reduce((prev, cur) => prev + cur, 0)
  }
  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={cart.length} color='secondary'>
          <ShoppingBagIcon />
        </Badge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Slide direction='left' in={checked}>
          <Box
            className='modal__container'
            sx={{ bgcolor: 'primary.main', color: 'text.primary' }}
          >
            <Box className='modal__cart__header'>
              <Typography variant='h3'>Your Cart</Typography>
            </Box>
            <Box
              className='modal__cart__content'
              sx={{ bgcolor: 'background.default', color: 'text.secondary' }}
            >
              {cart?.length === 0 ? (
                <Box className='modal__cart__content--empty'>
                  <Typography>Your Cart is Empty!</Typography>
                </Box>
              ) : (
                cart?.map((item) => {
                  return (
                    <Box key={item.id} className='modal__cart__content--item'>
                      <Box className='modal__cart__content--iteminfo'>
                        <Box
                          component='img'
                          src={item.images[0]}
                          alt='product'
                          width='100px'
                          height='100px'
                        ></Box>
                        <Box>
                          <Typography>{item.title}</Typography>
                        </Box>
                        <Box>
                          <Typography>Quantity: {item.quantity}</Typography>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() => {
                              dispatch(addToCart({ ...item, quantity: 1 }))
                            }}
                            size='medium'
                            sx={{ border: '1px solid' }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Box>
                          <IconButton
                            onClick={() => {
                              dispatch(decrement(item.id))
                            }}
                            size='medium'
                            sx={{ border: '1px solid' }}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </Box>
                        <Box>
                          <Typography>Total: {item.price}€</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => {
                            dispatch(deleteItem(item.id))
                          }}
                          size='medium'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )
                })
              )}
            </Box>

            <Box className='modal__cart__footer'>
              <Box
                sx={{
                  visibility: cart.length === 0 ? 'hidden' : 'visible',
                  justifyContent: 'flex-end',
                  padding: '2em',
                  display: 'flex',
                }}
              >
                <Typography>Cart Total: </Typography>
                <Typography sx={{ marginLeft: '1em' }}>
                  {totalCartPrice(cart)}€
                </Typography>
              </Box>
              <Button
                disabled={cart.length === 0 ? true : false}
                variant='contained'
                size='large'
                color='secondary'
                sx={{
                  width: '50%',
                  borderRadius: '5px',
                  transform: 'translateX(50%)',
                }}
              >
                CHECK OUT
              </Button>
            </Box>
          </Box>
        </Slide>
      </Modal>
    </Box>
  )
}

export default CartModal
