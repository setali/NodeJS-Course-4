console.clear()

// const buf = Buffer.from('AliMousavi')

// console.log(buf)

// const base64String = buf.toString('base64')

// console.log(base64String)

// const base64buffer = Buffer.from(base64String, 'base64')

// console.log(base64buffer)

// console.log(base64buffer.toString('utf8'))

function convert (text, from, to) {
  return Buffer.from(text, from).toString(to)
}

const result = convert('Ali', 'utf8', 'base64')

console.log(result)

console.log(convert(result, 'base64', 'utf8'))
