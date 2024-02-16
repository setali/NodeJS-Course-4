const { heavyProcess } = require('./heavy-process')

process.send('Hello from child: ' + process.pid)

process.on('message', data => console.log(data))

process.send({
  type: 'data',
  value: heavyProcess(),
  pid: process.pid
})
