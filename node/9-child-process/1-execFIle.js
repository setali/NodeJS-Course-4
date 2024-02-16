const { execFile } = require('child_process')

// execFile('node', ['--version'], (err, stdout, stderr) => {
// execFile('ls', ['-l'], (err, stdout, stderr) => {
execFile('python3', ['file.py'], (err, stdout, stderr) => {
  if (err) {
    console.log(stderr)
  } else {
    console.log(stdout)
  }
})
