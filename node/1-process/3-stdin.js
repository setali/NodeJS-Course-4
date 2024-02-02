// node 3-stdin.js < names.txt
// cat names.txt | node 3-stdin.js

process.stdin.on('data', data => {
  console.log(data)
  console.log(data.toString())
})
