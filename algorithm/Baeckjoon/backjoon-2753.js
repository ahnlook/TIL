const fs = require('fs');
const input = fs.readFileSync('/dev/stdin')

let num = Number(input)

if (num % 4 == 0 && num % 100 != 0) {
  console.log('1')
} else if (num % 4 == 0 && num % 400 == 0) {
  console.log('1')
} else {
  console.log('0')
}
