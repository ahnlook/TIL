// function solution(topping) {
//   let answer = 0
//   for (let i = 0; i < topping.length-1; i++) {
//   const a = new Set(topping.slice(0, i+1)).size
//   const b = new Set(topping.slice(i+1)).size
//   if (a === b) {
//       answer += 1
//       }
//   }
//   return answer;
// }

// function solution(topping) {
//   let answer = 0
//   const cheolsu = new Set()
//   const brother = new Set()

//   for (let i = 0; i < topping.length-1; i++) {
//     cheolsu.add(topping[i])
//     brother.clear()
//     topping.slice(i+1).forEach((piece) => brother.add(piece))
    
//   if (cheolsu.size === brother.size) {
//       answer += 1
//       }
//   }
//   return answer;
// }

// function removeDup (toppings) {
//   let uniqueTopping = []
//   for (unit of toppings) {
//     if (!uniqueTopping.includes(unit)) {
//       uniqueTopping.push(unit)
//     }
//   }

//   return uniqueTopping.length
// }

// function solution(topping) {
//   let answer = 0
//   const cheolsu = new Set()
//   const brother = [...topping]

//   for (let i = 0; i < topping.length-1; i++) {
//     cheolsu.add(topping[i])

//     const uniqueBrother = removeDup(topping.slice(i+1))
//     brother.shift()

//     console.log('ch', cheolsu)
//     console.log('br', uniqueBrother)
    
//     if (cheolsu.size === uniqueBrother) {
//       answer += 1
//     }
//   }
//   console.log('an', answer)
//   return answer;
// }

function solution(topping) {
  let answer = 0
  let brother = {}
  let cheolsu = topping.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1
    return acc
  }, {})
  let brotherCount = 0
  let cheolsuCount = Object.keys(cheolsu).length

  for(let i = 0; i < topping.length - 1; i ++) {
    cheolsu[topping[i]] -= 1

    if (topping[i] in brother) {
      brother[topping[i]] += 1
    } else {
      brotherCount += 1
      brother[topping[i]] = 1
    }

    if (cheolsu[topping[i]] === 0) {
      cheolsuCount -= 1
      delete cheolsu[topping[i]]
    }

    if (brotherCount === cheolsuCount) {
      answer += 1
    }
    console.log('bro ',brother)
    console.log('broC ',brotherCount)
    console.log('chel ', cheolsu)
    console.log('chel ', cheolsuCount)
    console.log(answer)
    console.log('-------')
  }
  return answer
}

solution([1, 2, 1, 3, 1, 4, 1, 2])