console.clear()

const args = process.argv.splice(2)

const entries = args.map(arg => arg.split('='))

const result = Object.fromEntries(entries)

console.log(result)
// console.log(__filename)
// console.log(__dirname)
