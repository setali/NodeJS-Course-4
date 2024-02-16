const { heavyProcess } = require('./heavy-process')
const { fork } = require('child_process')

const fork1 = fork('./child.js')
const fork2 = fork('./child.js')
const fork3 = fork('./child.js')
const fork4 = fork('./child.js')

setInterval(() => console.log(Date.now()), 10000)

// setTimeout(() => {
//   console.log(heavyProcess())
// }, 0)

// fork1.send('Aleyk from parent')
fork1.on('message', data => console.log(data))
fork2.on('message', data => console.log(data))
fork3.on('message', data => console.log(data))
fork4.on('message', data => console.log(data))

console.log('salam')
