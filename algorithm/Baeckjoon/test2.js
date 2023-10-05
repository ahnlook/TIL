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
    for (let j = 1; j < input.length; j++) {
      let nStr = ''
      for (let i = 0; i < input[j].length; i++) {
        let char = input[j][i]
        if (i % 2 == 0) {
          nStr = nStr + char
        }
      }
      for (let i = 0; i < input[j].length; i++) {
        let char = input[j][i]
        if (i % 2 == 1) {
          nStr = nStr + char
        }
      }
      console.log(nStr)
    }
  }
);
