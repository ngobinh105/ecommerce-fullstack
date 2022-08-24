import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'

import apiErrorHandler from './middlewares/apiErrorHandler.js'
import userRoute from './routers/user.route.js'
import imageRoute from './routers/image.route.js'
import productRoute from './routers/product.route.js'
import categoryRoute from './routers/category.route.js'
import authRoute from './routers/auth.route.js'

import { googleStrategy } from './config/passport.js'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 80)

// Global middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(cors())
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(googleStrategy)

// Set up routers
app.use('/users', userRoute)
app.use('/images', imageRoute)
app.use('/products', productRoute)
app.use('/categories', categoryRoute)
app.use('/auth', authRoute)
// Custom API error handler
app.use(apiErrorHandler)

export default app
