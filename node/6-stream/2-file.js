console.clear()
const stream = require('stream')
const fs = require('fs')
const path = require('path')

const chunks = []

const writeableStream = new stream.Writable({
  write (chunk, encoding, next) {
    console.log(chunk.length)
    chunks.push(chunk)
    setTimeout(() => {
      next()
    }, 5)
  }
})

const readableStream = new stream.Readable({
  read (size) {}
})

readableStream.pipe(writeableStream)

readableStream.on('close', () => {
  writeableStream.end()
})
writeableStream.on('close', () => {
  console.log('Writable stream ended!!!')
  console.log(chunks.length)
  const buffer = Buffer.concat(chunks)
  const newFilePath = path.resolve(__dirname, 'files', 'new-image.png')
  fs.writeFileSync(newFilePath, buffer)
})

const filePath = path.resolve(__dirname, 'files', 'image.png')

const data = fs.readFileSync(filePath)

const chunkSize = 2 ** 10 // 1KB

const chunkCount = Math.ceil(data.length / chunkSize)

for (let i = 0; i < chunkCount; i++) {
  const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize)
  readableStream.push(chunk)
}

setTimeout(() => {
  readableStream.destroy()
}, 20000)
