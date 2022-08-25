import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { returnedResponse } from './products'

const handler = [
  rest.post(`https://api.escuelajs.co/api/v1/users/`, (req, res, ctx) => {
    return res(ctx.json(req.body), ctx.delay(150))
  }),
  rest.delete(
    `https://api.escuelajs.co/api/v1/products/:productId`,
    (req, res, ctx) => {
      if (req.params.productId === '2') {
        return res(ctx.status(200), ctx.json({ rta: true }))
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'product not found', status: 404 })
        )
      }
    }
  ),
  rest.put(
    'https://api.escuelajs.co/api/v1/products/:productId',
    (req, res, ctx) => {
      if (req.params.productId === '2') {
        return res(ctx.json(req.body))
      } else {
        return res(
          ctx.status(404),
          ctx.json({ message: 'product not found', status: 404 })
        )
      }
    }
  ),
  rest.post('https://api.escuelajs.co/api/v1/products/', (req, res, ctx) => {
    return res(
      ctx.json({ ...returnedResponse, title: 'New Title' }),
      ctx.delay(150)
    )
  }),
]

export const mockServer = setupServer(...handler)
