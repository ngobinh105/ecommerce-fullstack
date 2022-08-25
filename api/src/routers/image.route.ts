import { Request, Response, Router } from 'express'

import { Image } from '../entity/Image'
import database from '../database'
import { NotFoundError } from '../helpers/apiError'

const imageRoute = Router()

const imageRepository = database.AppDataSource.getRepository(Image)

imageRoute.get('/:imageId', async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params
    const image = await imageRepository.findOneBy({ id: imageId })
    console.log('image', image)
    res.send(Buffer.from(image ? image.imageData : ''))
  } catch (e) {
    throw new NotFoundError()
  }
})

export default imageRoute
