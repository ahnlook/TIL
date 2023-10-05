const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let input = []

rl.on('line', function (line) {
  input = line.split(' ')
}).on('close', function () {
  const numbers = input.map(Number)
  let code = 97

  numbers.map(number => {
    console.log(`${String.fromCharCode(code)} = ${number}`)
    code++
  })
})
