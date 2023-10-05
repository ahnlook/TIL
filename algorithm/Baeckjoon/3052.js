const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const uniqueRemainders = []
for (let i = 0; i < 10; i++) {
  const remainder = parseInt(input[i]) % 42
  let exist = false
  for (let j = 0; j < uniqueRemainders.length; j++) {
    if (uniqueRemainders[j] === remainder) {
      exist = true
      break
    }
  }
  if (!exist) {
    uniqueRemainders.push(remainder)
  }
}
console.log(uniqueRemainders.length)