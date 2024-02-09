console.clear()

const http = require('http')
const path = require('path')
const fs = require('fs')
const URL = require('url')

function initApp (req, res) {
  const { pathname, query } = URL.parse(req.url)

  const entries = query?.split('&').map(el => el.split('='))

  const params = entries ? Object.fromEntries(entries) : {}

  req.pathname = pathname
  req.params = params

  res.json = data => res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  initApp(req, res)

  const { pathname, params } = req

  if (pathname === '/') {
    return res.end(fs.readFileSync(path.resolve('form-get.html')))
  }

  if (pathname === '/contact') {
    return res.json(params)
  }

  if (pathname === '/about') {
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
