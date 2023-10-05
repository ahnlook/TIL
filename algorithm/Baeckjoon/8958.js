const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

// 모범 답안?

const num = parseInt(input[0])

for (let i = 1; i <= num; i++) {
  let arr = input[i]
  let score = 0
  let sumScore = 0
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === 'O') {
      score ++
      sumScore += score
    } else {
      score = 0
    }
  }
  console.log(sumScore)
}


// 내 정답

// for (let i = 1; i <= Number(input[0]); i++) {
//   let score = []
//   let sumScore = 0
//   if (input[i][0] === 'O') {
//     score.push(1)
//   } else {
//     score.push(0)
//   }

//   for (let j = 0; j < Number(input[i].length); j++) {
//     if (input[i][j+1] === 'O') {
//       score.push(Number(score[j]) + 1)
//     } else {
//       score.push(0)
//     }
//     sumScore += Number(score[j])
//   }
//   console.log(sumScore)
// }