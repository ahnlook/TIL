const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()
const numbers = input.split('\n')

const isPrime = (num) => {
  if(num <= 1) return false

  const sqrt = Math.sqrt(num)
  for(let i = 2; i < sqrt; i++) {
    if(i % 2 === 0) return false
  }

  return true
}

const countPrime = (numbers) => {
  let primeNumbers = 0
  numbers.forEach((number) => {
    if(isPrime(number))
  })
}

let count = 0
const prime = numbers.map((number) => {
  if(isPrime(number)) countPrime += 1
})
