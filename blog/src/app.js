import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import overrideMethod from './middlewares/override-method'
import { sequelize } from './config/database'
import session from 'express-session'
import RedisStore from 'connect-redis'
import Redis from 'ioredis'
import auth from './middlewares/auth'

export async function bootstrap () {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(overrideMethod)

  app.set('views', path.resolve(__dirname, 'views'))
  app.set('view engine', 'ejs')

  const redisClient = new Redis(process.env.REDIS_PORT)

  const store = new RedisStore({ client: redisClient })

  app.use(
    session({
      store,
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(auth)
  app.use(express.static('public'))
  app.use(router)

  app.use(errorHandler)

  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully and sync.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  const PORT = process.env.PORT

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
