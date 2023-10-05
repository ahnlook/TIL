const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()

const num = Number(input)
let sumNum = 0

for (let i = 0; i <= num; i++) {
  sumNum += i
}
