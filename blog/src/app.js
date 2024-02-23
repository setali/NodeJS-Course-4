import path from 'path'
import fs from 'fs'
import express from 'express'
import router from './routes'
import errorHandler from './middlewares/error-handler'

const app = express()

app.engine('ali', (filePath, params, cb) => {
  let view = fs.readFileSync(filePath, 'utf-8')

  const entries = Object.entries(params)

  entries.forEach(([key, value]) => {
    if (typeof value === 'string') {
      view = view.replace(`#${key}#`, value)
    }
  })

  cb(null, view)
})

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ali')

app.use(express.static('public'))
app.use(router)

app.use(errorHandler)

const PORT = 3000

app.listen(PORT, () => {
  // console.clear()
  console.log(`Server is running on port ${PORT}`)
})
