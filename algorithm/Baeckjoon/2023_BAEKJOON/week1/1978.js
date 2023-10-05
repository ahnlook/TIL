const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()

const inputNumbers = input.split('\n')
const numbers = inputNumbers[1].split(' ').map(Number)

const isPrime = (num) => {
  if(num === 1) return false
  for(let i = 2; i <= Math.sqrt(num); i++){
    if(num % i === 0) return false
  }

  return true
}

let countPrime = 0

numbers.forEach((number) => {
  if(isPrime(number)) {
    countPrime += 1
  }
})

console.log(countPrime)

// memory 9340KB
// time 116 ms