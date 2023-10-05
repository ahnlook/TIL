// n = 페인트가 칠해진 길이 (1미터)
// m = 페인트를 칠하는 롤러의 길이
// section = 다시 페인트를 칠하기로 정한 구역들의 번호가 담긴 배열
// 롤러 규칙
// - 롤러가 벽에서 벗어나면 안 된다.
// - 구역의 일부분만 포함되도록 칠하면 안 된다.
solution(8, 4, [2, 3, 6])

function solution(n, m, section) {
  let maximum = section[0] + m - 1
  let answer = 1
  section.forEach(el => {
    if (el < maximum) {
      return
    }
    maximum = el + m - 1
    answer++
  })

  return answer
  // let answer = 0

  // if (m < section[section.length - 1]) {
  //   const maxPainting = Math.floor(n / m)
  //   return maxPainting
  // }

  // if (m === 1) {
  //   return n
  // }
}

// 6 - 2 = 4
// 2 ~ 6 = 5

// 3 - 1 = 2
// 1 ~ 3 = 3

// Math.ceil((section[section.length-1] - section[0] + 1) / m)

// n	m	section	result
// 8	4	[2, 3, 6]	2
// 5	4	[1, 3]	1
// 4	1	[1, 2, 3, 4]	4
//
