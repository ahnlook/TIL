// ### 매개변수 정보

// `name` : 그리워하는 사람을 담은 문자열 배열
// `yearning` : 사람별 그리움 점수를 담은 정수 배열
// `photo` : 사진에 찍힌 인물의 이름을 담은 이차원 문자 배열

function solution(name, yearning, photo) {
  const answer = []
  const obj = {}

  name.forEach((name, i) => {
    obj[name] = yearning[i]
  })

  photo.forEach(names => {
    let score = 0

    names.forEach(name => {
      if (!obj[name]) {
        return
      }
      score += obj[name]
    })

    answer.push(score)
  })

  console.log(answer)
  return answer
}

solution(
  ['may', 'kein', 'kain', 'radi'],
  [5, 10, 1, 3],
  [
    ['may', 'kein', 'kain', 'radi'],
    ['may', 'kein', 'brin', 'deny'],
    ['kon', 'kain', 'may', 'coni']
  ]
)
