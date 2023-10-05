const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

let max = Number(input[0])
let index = 1
for (let i = 1; i < input.length; i++) {
  if (max < Number(input[i])) {
    max = Number(input[i])
    index = i+1
  }
}
console.log(max)
console.log(index)