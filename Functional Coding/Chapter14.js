// 1
function incrementQuantity(item) {
  var quantity = item['quantity']
  var newQuantity = quantity + 1
  var newItem = objectSet(item, 'quantity', newQuantity)
  return newItem
}

// 2 - 필드명 명시적으로 만들기
function incrementField(item, field) {
  var value = item[field]
  var newValue = value + 1
  var newItem = objectSet(item, field, newValue)
  return newItem
}

function decrementField(item, field) {
  var value = item[field]
  var newValue = value - 1
  var newItem = objectSet(item, field, newValue)
  return newItem
}

// 3 - update 도출하기
function incrementField(item, field) {
  return updateField(item, field, function (value) {
    return value + 1
  })
}

function updateField(item, field, modify) {
  var value = item[field] // 조회
  var newValue = modify(value) // 바꾸기
  var newItem = objectSet(item, field, newValue) // 설정
  return newItem
}

// 1
function incrementSize(item) {
  var options = item.options
  var size = options.size
  var newSize = size + 1
  var newOptions = objectSet(options, 'size', newSize)
  var newItem = objectSet(item, 'options', newOptions)
  return newItem
}

// 2
function incrementSize(item) {
  var options = item.options
  var newOptions = update(options, 'size', increment)
  var newItem = objectSet(item, 'options', newOptions)
  return newItem
}

// 3
function incrementSize(item) {
  // 암묵적 인자 사용 ('options')
  return update(item, 'options', function (options) {
    // 암묵적 인자 사용 ('size')
    return update(options, 'size', increment)
  })
}

// 4
function incrementSize(item) {
  return update2(item, 'options', 'size', function (size) {
    return size + 1
  })
}

function update3(object, key1, key2, key3, modify) {
  return update(object, key1, function (object2) {
    return update2(object2, key2, key3, modify)
  })
}

// 5
function nestedUpdate(object, keys, modify) {
  if (keys.length === 0) {
    // 재귀 종료 조건
    return modify(object)
  }
  var key1 = keys[0]
  var restOfKeys = drop_first(keys)
  return update(object, key1, function (value) {
    return nestedUpdate(value, restOfKeys, modify)
  })
}

// 6
function incrementSizeByName(cart, name) {
  return nestedUpdate(cart, [name, 'options', 'size'], function (size) {
    return size + 1
  })
}

// 추상화 벽 사용하기
// 1
function updatePostById(category, id, modifyPost) {
  return nestedUpdate(category, ['posts', id], modifyPost)
}

function updateAuthor(post, modifyUser) {
  return update(post, 'author', modifyUser)
}

function capitalizeName(user) {
  return update(user, 'name', capitalize)
}

// 2
updatePostById(blogCategory, '12', function (post) {
  return updateAuthor(post, capitalizeName)
})

//
const arr = [
  { apple: 20 },
  { apple: 50 },
  { banana: 25 },
  { apple: 30 },
  { banana: 50 },
  { melon: 20 },
  { melon: 50 }
]

// reduce를 통해 나올 기댓값
// ;[{ apple: 100 }, { banana: 75 }, { melon: 70 }]

arr.reduce((acc, cur) => {
  const key = Object.keys(cur)[0]
  const value = cur[key]
  const obj = acc.find(item => item[key])
  if (obj) {
    obj[key] += value
  } else {
    acc.push(cur)
  }
  return acc
}, [])
