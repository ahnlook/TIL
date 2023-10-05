// 원하는 카드 뭉치에서 카드를 순서대로 한 장씩 사용한다.
// 한 번 사용한 카드는 다시 사용할 수 없다.
// 카드를 사용하지 않고 다음 카드로 넘어갈 수 없다.
// 기존에 주어진 카드 뭉치의 단어 순서는 바꿀 수 없다.

function solution(cards1, cards2, goal) {
  let answer = 'Yes'

  for (let i = 0; i < goal.length; i++) {
    if (cards1[0] === goal[i]) {
      cards1.shift()
      continue
    }

    if (cards2[0] === goal[i]) {
      cards2.shift()
      continue
    }

    return 'No'
  }

  return answer
}

console.log(
  solution(
    ['i', 'water', 'drink'],
    ['want', 'to'],
    ['i', 'want', 'to', 'drink', 'water']
  )
)
