const braket = '()))((()'

const solution = (s) => {
  let result = true
  let open = 0

  if (s[0] === ')' || s[s.length-1] === '(') {
    result = false
    return result
  }
  
  for (one of s) {
    if (open === 0 && one === ')') {
      result = false
      return result
    }

    if (one === '(') {
      open += 1
    } else {
      open -= 1
    }
  }

  if (open !== 0) {
    result = false
  }
  
  return result
}

const test = solution(braket)
console.log(test)