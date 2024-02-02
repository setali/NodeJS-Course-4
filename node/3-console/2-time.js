const times = {}

function time (label) {
  times[label] = Date.now()
}

function timeEnd (label) {
  if (!times[label]) throw 'Error'

  console.log(`${label}: %ds`, (Date.now() - times[label]) / 1000)
}

time('ali')

console.log((99999999n ** 999999n).toString().length)

timeEnd('ali')
// console.time('my-label')
// const time = Date.now()

// console.log((99999999n ** 999999n).toString().length)

// console.timeEnd('my-label')
// console.log(Date.now() - time)
