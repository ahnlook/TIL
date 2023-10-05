const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString()

const num = input.split(' ')

const hour = Number(num[0])
const minute = Number(num[1])

let alarmHour
let alarmMinute
let alarm = ''

if (minute < 45) {
  if (hour === 0) {
    alarmHour = 23
  } else {
    alarmHour = hour - 1
  }

  alarmMinute = 60-(45-minute)
} else {
  alarmMinute = minute - 45
}

// if (minute < 45 && hour > 0) {
//   hour = hour-1,
//   minute = 60-(45-minute)
// } else if (minute < 45 && hour == 0) {
//   hour = 23,
//   minute = 60-(45-minute)
// } else {
//   minute = minute-45
// }

alarm = alarm + alarmHour + ' ' + alarmMinute
console.log(alarm)