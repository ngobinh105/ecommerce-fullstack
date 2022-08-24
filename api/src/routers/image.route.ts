import { Request, Response, Router } from 'express'

import { Image } from '../entity/Image.js'
import database from '../database.js'
import { NotFoundError } from '../helpers/apiError.js'

const imageRoute = Router()

const imageRepository = database.AppDataSource.getRepository(Image)

imageRoute.get('/:imageId', async (req: Request, res: Response) => {
  try {
    const { imageId } = req.params
    const image = await imageRepository.findOneBy({ id: imageId })
    res.end(image?.imageData, 'binary')
  } catch (e) {
    throw new NotFoundError()
  }
})

export default imageRoute
