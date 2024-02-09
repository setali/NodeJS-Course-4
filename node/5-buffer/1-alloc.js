// const buf = Buffer.alloc(10, 'a?121A%')

console.clear()

// console.log(typeof buf)
// console.log(buf)

// console.log(buf[0].toString(2))
// console.log(buf[1])
// console.log(buf[15])

// console.log(Array.isArray(buf))

// const buf = Buffer.alloc(4, 'alii')

// console.log(buf)

// console.log(buf[0].toString(2))
// console.log(buf[1].toString(2))
// console.log(buf[2].toString(2))
// console.log(buf[3].toString(2))

// 01100001 01101100 01101001
// 011000 010110 110001 101001

// console.log(buf.toString('base64'))

// const buf = Buffer.allocUnsafe(10)

// console.log(buf)

// const buf = Buffer.from('Ali Mousavi')

// console.log(buf)
// console.log(buf.length)

// const buf2 = Buffer.from(buf)

// console.log(buf2)
// console.log(buf2 == buf)

// console.log(buf.toString())

const str = 'علی موسوی'

// const buf = Buffer.from(str)

// console.log(buf)
// console.log(str.length)
// console.log(buf.length)

const buf = Buffer.alloc(3, str)
console.log(buf)
console.log(buf.toString())
