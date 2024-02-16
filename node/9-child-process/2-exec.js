const { exec } = require('child_process')

exec('ls -l | grep .js', (err, stdout, stderr) => {
  if (err) {
    console.log(stderr)
  } else {
    console.log(stdout)
  }
})
