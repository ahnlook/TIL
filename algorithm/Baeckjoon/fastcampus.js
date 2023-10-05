import _ from 'lodash'

const usersA = [
  { userID: '1', name: 'ahn' },
  { userID: '2', name: 'han' }
]

const usersB = [
  { userID: '1', name: 'ahn' },
  { userID: '3', name: 'nah' }
]

const usersC = usersA.concat(usersB)
console.log(_.uniqBy(usersC, 'userID'))

const usersD = _.unionBy(usersA, usersB, 'userID')
console.log(usersD)