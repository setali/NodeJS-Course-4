// console.log(process.pid)
// console.log(process.ppid)
// console.log(process.cwd())
// console.log(process.getuid())
// console.log(process.env)
const os = require('os')

console.log(os.cpus().length)
console.log(os.machine())
console.log(os.version())

process.title = 'Anisa'

setTimeout(() => {
  console.log(process.uptime())
}, 8000)

setTimeout(() => {
  //   process.kill(process.pid)
}, 3000)

process.on('uncaughtException', ex => {
  console.log(ex)
})

throw 'Error'
