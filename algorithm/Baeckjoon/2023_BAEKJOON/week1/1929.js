const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()

const [num1, num2] = input.split(' ').map(Number)

const isPrime = (num) => {
  if (num === 1) return false

  for(let i = 2; i <= Math.sqrt(num); i++){
    if (num % i === 0) return false
  }

  return true
}

for (let i = num1; i <= num2; i++) 
  isPrime(i) ? console.log(i) : null

  // memory 16876KB
  // time 4132ms
