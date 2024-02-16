const http = require('http')
const fs = require('fs')
const path = require('path')
const URL = require('url')

const server = http.createServer((req, res) => {
  const { pathname } = URL.parse(req.url)

  if (pathname === '/') {
    const filePath = path.resolve(__dirname, 'music.mp3')

    const stream = fs.createReadStream(filePath, { highWaterMark: 1024 })

    stream.pipe(res)
    stream.pipe(process.stdout)

    setTimeout(() => {
      stream.pause()
    }, 120)

    setTimeout(() => {
      stream.resume()
    }, 20000)

    return
  }

  res.statusCode = 404
  res.end('NotFound')
})

server.listen(3000, () => {
  console.log('Server s up on 3000')
})
