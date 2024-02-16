const http = require('http')

const server = http
  .createServer((req, res) => {
    if (req.url === '/') {
      const entries = req.headers.cookie
        .split(';')
        .map(el => el.trim().split('='))

      const obj = Object.fromEntries(entries)

      console.log(obj)

      const counter = +obj.counter || 0

      res.setHeader('Set-Cookie', `counter=${counter + 1}; Max-Age=100`)

      res.end('salam')
    }
  })
  .listen(3000)
