const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const testNum = parseInt(input[0])

for (let i = 1; i <= testNum; i++) {
  let sumScore = 0, averageScore = 0
  let testArr = input[i].split(' ')
  for (let j = 1; j < testArr.length; j++) {
    sumScore += parseInt(testArr[j])
  }
  averageScore = sumScore/testArr[0]

  let students = 0
  for (let k = 1; k < testArr.length; k++) {
    if (testArr[k] > averageScore) {
      students ++
    }
  }
  console.log((students / parseInt(testArr[0]) * 100).toFixed(3) + '%')
}