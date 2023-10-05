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
    let sum = 0;

    for (let i = 0; i < input[0].length; i++) {
      const num = Number(input[0][i])
      sum = sum + num
    }
    console.log(sum)
  }
);
