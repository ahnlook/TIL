const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim()

function getHanNumbers(input) {
  const hanNumbers = []
  
  for (let i = 1; i <= input; i++) {
    if (i < 100) {
      hanNumbers.push(i)
    } else if (i < 1000) {
      const ones = i % 10
      const tens = parseInt(i / 10) % 10
      const hundreds = parseInt(i / 100)

      if (ones - tens === tens - hundreds) {
        hanNumbers.push(i)
      }
    }
  }
  return hanNumbers.length
}

console.log(getHanNumbers(input))

function hanNumber(input) {
  const digitArr = []
  let hanNum, digitArrI
  let temp = 0

  for (let i = 1; i <= input; i++) {
    if (i < 100) {
      hanNum = i
    } else if (i < 1000) {
      digitArrI = 0
      temp = i
      while (temp > 0) {
        digitArr[digitArrI] = temp % 10
        temp = parseInt(temp / 10)
        digitArrI ++
      }
      if (digitArr[0] - digitArr[1] === digitArr[1] - digitArr[2]) {
        hanNum ++
      }
    } else {
      break
    }
  }
  return hanNum
}

console.log(hanNumber(input))