console.clear()

const buf = Buffer.from('AliMousavi')

console.log(buf)
console.log(buf.length)

console.log(buf.slice(0, 3))
console.log(buf.subarray(0, 3))

buf[0] = 69

console.log(buf)

console.log(buf.toString())
