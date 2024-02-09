console.clear()

const stream = require('stream')

const transformStream = new stream.Transform()

transformStream._transform = function (chunk, encoding) {
  const data = chunk.toString().toUpperCase()
  transformStream.push(data)
}

process.stdin.pipe(transformStream).pipe(process.stdout)
