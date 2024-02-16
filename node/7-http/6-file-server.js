const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const STATIC_DIR = 'public'

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    return res.end(fs.readFileSync(path.resolve('index.html')))
  }

  const filePath = path.resolve(__dirname, STATIC_DIR, ...pathname.split('/'))

  if (fs.existsSync(filePath)) {
    return res.end(fs.readFileSync(filePath))
  }

  res.statusCode = 404
  res.end('NotFound')
})

server.listen(3000, () => {
  console.log('Server s up on 3000')
})
