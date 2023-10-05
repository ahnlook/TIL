const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const N = Number(input[0])
const scores = input[1].split(' ')

let maxScore = Number(scores[0])
for (let i = 1; i < N; i++) {
  let num = Number(scores[i])
  if (num > maxScore) {
    maxScore = num
  }
}

let newScores = []
let averageScore = 0
for (let i = 0; i < N; i++) {
  let num = Number(scores[i])
  newScores.push(num/maxScore*100)
  averageScore += Number(newScores[i])
}

console.log(averageScore/N)