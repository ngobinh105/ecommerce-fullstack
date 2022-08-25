import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'

import database from '../database'
import { User } from '../entity/User'
import userService from '../services/user.service'

dotenv.config({ path: '.env' })
export const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
      ? process.env.GOOGLE_CLIENT_SECRET
      : '',
    callbackURL: '/auth/google/callback',
  },
  async function (accessToken, refreshToken, profile, cb) {
    const email = profile.emails ? profile.emails[0].value : ''
    const userRepository = database.AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ email })
    const randomPassword = Math.random().toString(36).slice(-8)
    if (user) {
      return cb(null, user)
    } else {
      const newUser = {
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        email: profile.emails ? profile.emails[0].value : '',
        avatar: profile.profileUrl
          ? profile.profileUrl
          : profile.photos
          ? profile.photos[0].value
          : '',
        password: randomPassword,
        role: 'buyer',
      }
      const user = userRepository.create(newUser)
      const addedUser = await userService.createOne(user)
      return cb(null, addedUser)
    }
  }
)

const userRepository = database.AppDataSource.getRepository(User)
passport.serializeUser<any, any>((req, user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user: any, done) => {
  done(null, user)
})
