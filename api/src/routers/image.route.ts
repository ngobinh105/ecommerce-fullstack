import { Request, Response, Router } from 'express'

import { Image } from '../entity/Image'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const imageRoute = Router()

imageRoute.get('/:imageId', async (req: Request, res: Response) => {
  const { imageId } = req.params
  const imageRepository = database.AppDataSource.getRepository(Image)
  const image = await imageRepository.findOneBy({ id: imageId })
  if (image) {
    res.end(image.imageData, 'binary')
  } else {
    throw new NotFoundError('Image not found')
  }
})

export default imageRoute
