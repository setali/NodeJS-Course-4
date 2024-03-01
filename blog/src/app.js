import path from 'path'
import fs from 'fs'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import router from './routes'
import errorHandler from './middlewares/error-handler'
import overrideMethod from './middlewares/override-method'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(overrideMethod)

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(router)

app.use(errorHandler)

const PORT = 3000

app.listen(PORT, () => {
  // console.clear()
  console.log(`Server is running on port ${PORT}`)
})
