console.clear()

const http = require('http')
const path = require('path')
const fs = require('fs')
const URL = require('url')
const qs = require('qs')

function initApp (req, res) {
  const { pathname, query } = URL.parse(req.url)

  req.pathname = pathname
  req.params = qs.parse(query)

  res.json = data => res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  initApp(req, res)

  const { pathname, params } = req

  if (pathname === '/login' && req.method === 'GET') {
    return res.end(fs.readFileSync(path.resolve('form-post.html')))
  }

  if (pathname === '/login' && req.method === 'POST') {
    const data = []
    req.on('data', chunk => {
      data.push(chunk)
    })

    req.on('end', () => {
      const buffer = Buffer.concat(data)
      const string = buffer.toString()
      const body = qs.parse(string)
      res.json(body)
    })

    return
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
