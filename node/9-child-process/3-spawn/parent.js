const { spawn } = require('child_process')
const path = require('path')

process.title = 'Node - Parent'
console.log('parent', process.pid)

const controller = new AbortController()

const child = spawn('node', [path.resolve('child.js')], {
  signal: controller.signal
})

child.stdout.on('data', data => {
  console.log(data.toString())
})

child.stderr.on('data', err => {
  console.log(err.toString())
})

child.on('close', code => {
  console.log('Code:', code)
})

setTimeout(() => {
  controller.abort()
}, 5000)
