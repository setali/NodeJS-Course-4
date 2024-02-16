const { parentPort, workerData } = require('worker_threads')

parentPort.postMessage((workerData.a ** workerData.b).toString().length)

// console.log(workerData)
// console.log(process.pid) // It's same as parent

// parentPort.on('message', data => console.log(data))

// parentPort.postMessage('Hi from worker')

// setTimeout(() => {
//   parentPort.postMessage('terminate')
// }, 4000)
