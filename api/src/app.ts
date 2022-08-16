import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import userRoute from './routers/user.route'
import imageRoute from './routers/image.route'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3001)

// Global middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())

// Set up routers
app.use('/users', userRoute)
app.use('/images', imageRoute)
// Custom API error handler
app.use(apiErrorHandler)

export default app
