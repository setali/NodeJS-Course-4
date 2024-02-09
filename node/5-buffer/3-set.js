console.clear()

const buf = Buffer.from('AliMousavi')

console.log(buf)

const buf2 = Buffer.from('Pouyan')

buf.set(buf2)

console.log(buf2)
console.log(buf2.toString())
