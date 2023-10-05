function solution(k, m, score) {
  let answer = 0
  const sortedScore = score.sort((a, b) => b - a)
  console.log('sortedScore', sortedScore)
  const box = []
  
  for(let i = 0; i < sortedScore.length; i += m) {
    const temp = sortedScore.slice(i, i+m)
    if (temp.length === m) {
      box.push(temp)
    }
  }

  answer = box.reduce((acc, curr) => {
    return acc + Math.min(...curr) * m
  }, 0)

  console.log('box :', box)
  return answer
}

solution(3, 4, [1, 2, 3, 1, 2, 3, 1])
// k : 최상품 사과 (3~9)
// 1 : 최하품 사과
// m : 한 상자에 담아야하는 사과 개수 (3~10)
// p : 한 상자에 담긴 사과 중 가장 낮은 점수
// p * m = 사과 한 상자의 가격

// 이익이 발생하지 않는 경우 0을 return