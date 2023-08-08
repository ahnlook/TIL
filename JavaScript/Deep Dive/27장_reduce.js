Array.prototype.myReduce = function (callback, initialValue) {
  const array = this

  validateInput(callback, array, initialValue)

  let accumulator = hasInitialValue(initialValue) ? initialValue : array[0]
  const startIndex = hasInitialValue(initialValue) ? 0 : 1

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array)
  }

  return accumulator
}

function validateInput(callback, array, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('Callback must be a function')
  }
  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value')
  }
}

function hasInitialValue(initialValue) {
  return initialValue !== undefined
}
