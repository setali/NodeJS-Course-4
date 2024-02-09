console.clear()
const Stream = require('stream')

const writeableStream = Stream.Writable()

writeableStream._write = (chunk, encoding, next) => {
  console.log(chunk)
  console.log(chunk.toString())
  console.log(encoding)
  next()
}

const readableStream = Stream.Readable()

readableStream.pipe(writeableStream)

readableStream._read = function (size) {
  //   console.log('Size =>', size)
}

let counter = 1

const intervalId = setInterval(() => {
  readableStream.push(String(counter++))
}, 2000)

readableStream.on('close', () => writeableStream.end())
writeableStream.on('close', () => console.log('Writable stream ended!!!'))

setTimeout(() => {
  readableStream.destroy()
  clearInterval(intervalId)
}, 10000)
