const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString();

for (let i = 1; i <= input; i++) {
  let stars = ''
  for (let j = input; j > i; j--) {
    stars += ' '
  }
  for (let k = 0; k < i; k++) {
    stars += "*"
  }
  console.log(stars)
}
