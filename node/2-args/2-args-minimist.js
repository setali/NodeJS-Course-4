const minimist = require('minimist')

const args = minimist(process.argv.splice(2))

console.log(args)
