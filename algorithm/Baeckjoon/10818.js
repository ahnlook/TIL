const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const num = Number(input[0])
const numbers = input[1].split(' ')

let min = Number(numbers[0])
for (i = 1; i < num; i++) {
  if (min > Number(numbers[i])) {
    min = numbers[i]
  }
}
let max = Number(numbers[0])
for (i = 1; i < num; i++) {
  if (max < Number(numbers[i])) {
    max = numbers[i]
  }
}

console.log(min + ' ' + max)