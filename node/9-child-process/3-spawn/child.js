console.log("Hi, I'm child")

process.title = 'Node - Child'
console.log('child', process.pid)
console.log('child ppid', process.ppid)

// throw 'Child error'

console.log('Second log')

setTimeout(() => {}, 10000)
