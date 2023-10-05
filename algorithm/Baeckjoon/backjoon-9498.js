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
    let num = Number(input[0])

    if (89 < num && num <= 100) {
      console.log('A');
    } else if (79 < num && num < 90) {
      console.log('B');
    } else if (69 < num && num < 80) {
      console.log('C');
    } else if (59 < num && num < 70) {
      console.log('D');
    } else {
      console.log('F');
    }
  }
);
