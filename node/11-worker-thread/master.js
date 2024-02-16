const { Worker } = require('worker_threads')
const path = require('path')

// setTimeout(() => {
//   console.log((99999999n ** 9999999n).toString().length)
// }, 0)

console.log(process.pid)

const workerPath = path.resolve('worker.js')

function makeWorker (a, b) {
  const worker = new Worker(workerPath, {
    workerData: { a, b }
  })

  worker.postMessage('Hello from master')

  worker.on('message', data => {
    if (data === 'terminate') {
      worker.terminate()
    } else {
      console.log('=>', data)
    }
  })

  worker.on('exit', code => {
    console.log(code)
  })
}

makeWorker(99999999999n, 9999999n)
makeWorker(999999999n, 9999999n)
makeWorker(9999999999n, 9999999n)
makeWorker(999999n, 9999999n)
makeWorker(99999999999n, 9999999n)
makeWorker(999999999n, 999999n)
makeWorker(9999999999n, 999999n)
makeWorker(999999n, 999999n)

setInterval(() => {
  console.log(Date.now())
}, 1000)
