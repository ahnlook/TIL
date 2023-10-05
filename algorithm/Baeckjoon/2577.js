const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const number = input[0]*input[1]*input[2]
const numbers = String(number).split('')

let zeroCount = 0

for (let i = 0; i < numbers.length; i++) {
  if (Number(numbers[i]) == 0) {
    zeroCount += 1
  }
}

console.log(zeroCount)