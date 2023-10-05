const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()

const arr = input.split('\n')

for (let i = 1; i <= arr[0]; i++) {
  let sum = 0
  for (let j = 0; j < arr[i].length; j++) {
    let num = Number(arr[i][j])
    sum = sum + num
  }
  console.log(sum)
}