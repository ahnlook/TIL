var input = [];

require('readline')
.createInterface(process.stdin, {})
.on(
  'line',
  function(line) {
    input.push(line.trim());
  }
)
.on(
  'close',
  function() {
    let nArr = input[0].split(' ');

    let a = Number(nArr[0])
    let b = Number(nArr[1])
    
    if (a > b) {
      console.log('>')
    } else if (a < b) {
      console.log('<')
    } else {
      console.log('==')
    }
  }
);
