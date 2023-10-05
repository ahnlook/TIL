function solution(k, score) {
  var answer = []

  let scores = []
  for (let i = 0; i < score.length; i++) {
    const temp = [...scores]

    temp.push(score[i])
    temp.sort((a, b) => b - a)
    scores = temp.slice(0, k)

    answer.push(scores[scores.length - 1])
  }

  return answer
}

// score를 담는 배열
// 내림차순 정렬
// 마지막 점수 담기 (answer)
// 0부터 k 길이 만큼 자르기 (명예의 전당)

// k	score	result
// 3	[10, 100, 20, 150, 1, 100, 200]	[10, 10, 10, 20, 20, 100, 100]
// 4	[0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]	[0, 0, 0, 0, 20, 40, 70, 70, 150, 300]
solution(3, [10, 100, 20, 150, 1, 100, 200])
