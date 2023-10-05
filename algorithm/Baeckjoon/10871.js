const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const spt = input[0].split(' ');
const numbers = input[1].split(' ');

let answer = '';
for (let i = 0; i < spt[0]; i++) {
  if (Number(numbers[i]) < Number(spt[1])) {
    answer += numbers[i]+' '
  }
}

console.log(answer)