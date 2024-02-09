console.clear()

const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    return res.end('Home Page')
  }

  if (req.url === '/about') {
    const p = path.resolve('about.html')
    const data = fs.readFileSync(p)

    return res.end(data)
  }

  if (req.url === '/favicon.ico') {
    return res.end(fs.readFileSync(path.resolve('favicon.ico')))
  }

  res.statusCode = 404

  res.end('Not found')
})

server.listen(3000, () => {
  console.log('Server is active on port: 3000')
})
