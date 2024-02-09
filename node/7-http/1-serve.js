console.clear()

const http = require('http')

const server = http.createServer((req, res) => {
  //   console.log(req.url)
  //   console.log(req.method)
  //   console.log(req.httpVersion)
  //   console.log(req.headers)
  //   console.log(Object.keys(req))

  //   res.setHeader('content-type', 'text/plain')
  res.setHeader('content-type', 'text/html')
  // res.setHeader('content-type', 'application/json')

  const buf = Buffer.from('Ali Mousavi')
  console.log(buf)

  res.writeHead(401)

  res.write('<h1>')
  res.write(buf)
  res.write('</h1>')

  console.log(Object.keys(res))
  console.log(req === res.req)

  res.end()

  // res.write('Salam') //  Error

  // Log to DB
  // Send SMS

  console.log('Salam')

  // res.end(JSON.stringify({ name: 'Ali' }))
})

server.listen(3000, () => {
  console.log('Server is active on port: 3000')
})
