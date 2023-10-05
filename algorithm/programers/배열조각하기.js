// function solution(arr, query) {
//   let newArr = [...arr]

//   query.forEach((q, i) => {
//     if (i % 2 === 0) {
//       newArr = newArr.slice(0, q + 1)
//     } else {
//       newArr = newArr.slice(q)
//     }
//     console.log(newArr)
//   })

//   return newArr
// }

function solution(arr, query) {
  let newArr = [...arr]

  query.forEach((q, i) => {
    newArr = i % 2 ? newArr.slice(q) : newArr.slice(0, q + 1)
  })

  return newArr
}

solution([0, 1, 2, 3, 4, 5], [4, 1, 2])
// 1. query를 순회
// 2. 짝수 인덱스에서는 arr에서 query[i]번 인덱스 뒷 부분을 잘라서 버린다.
// 3. 홀수 인덱스에서는 arr에서 query[i]번 인덱스 앞 부분을 잘라서 버린다.
