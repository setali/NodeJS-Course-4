const http = require('http')
const cluster = require('cluster')
const cpuCount = require('os').cpus().length

if (cluster.isMaster) {
  process.title = 'Node - Master'
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
} else {
  process.title = `Node - child ${process.pid}`
  http
    .createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
      res.end(process.pid + '')
    })
    .listen(3000, () => console.log('Server is active on pid', process.pid))
}
