## 37.1 Set

- Set 객체는 중복되지 않는 `유일한 값들의 집합`이다.
- Set은 수학적 집합을 구현하기 위한 자료구조다.

### 37.1.1 Set 객체의 생성

```jsx
const set = new Set()
console.log(set) // Set(0)

// 이터러블의 중복된 값은 요소로 저장되지 않는다.
const set1 = new Set([1, 2, 3, 3])
console.log(set1) // Set(3) {1, 2, 3}

const set2 = new Set('hello')
console.log(set2) // set(4) {'h', 'e', 'l', 'o'}

// 배열에서 중복된 요소를 제거할 수 있다.
const uniq = array => [...new Set(array)]
console.log(unuq([2, 1, 2, 3, 4, 3, 4]) // [2, 1, 3, 4]
```

### 37.1.2 요소 개수 확인

```jsx
const { size } = new Set([1, 2, 3, 3])
console.log(size) // 3
```

- `size` 프로퍼티는 setter 함수 없이 `getter` 함수만 존재하는 접근자 프로퍼티다.
- 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수를 변경할 수 없다.

### 37.1.3 요소 추가

```jsx
const set new Set()
console.log(set) // Set(0) {}

set.add(1)
console.log(set) // Set(1) {1}

set.add(1).add(2).add(2)
console.log(set) // Set(2) {1, 2}
```

- Set 객체는 `NaN`과 `NaN`을 같다고 평가하여 중복 추가를 허용하지 않는다. (비교연산자는 false)
- Set 객체는 `+0`과 `-0`을 같다고 평가하여 중복 추가를 허용하지 않는다. (비교연산자는 true)

```jsx
const set = new Set()

set
  .add(1)
  .add('a')
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {})

console.log(set) // Set(8) {1, 'a', true, undefined, null, {}, [], () => {}}
```

### 37.1.4 요소 존재 여부 확인

```jsx
Set.prototype.has
```

```jsx
const set = new Set([1, 2, 3])

console.log(set.has(2)) // true
console.log(set.has(4)) // false
```

### 37.1.5 요소 삭제

```jsx
Set.prototype.delete
```

```jsx
const set = new Set([1, 2, 3])

set.delete(2)
console.log(set) // Set(2) {1, 3}

set.delete(0) // 존재하지 않는 요소를 삭제하면 에러 없이 무시된다.
console.log(set) // Set(2) {1. 3}

set.delete(1).delete(2) // TypeError
```

### 37.1.6 요소 일괄 삭제

```jsx
Set.prototype.clear
```

- `clear` 메서드는 언제나 `undefined`를 반환한다.

```jsx
const set = new Set([1, 2, 3])

set.clear()
console.log(set) // Set(0) {}
```

### 37.1.7 요소 순회

```jsx
Set.prototype.forEach(현재_요소_값, 현재_요소_인덱스, 현재_Set_객체_자체)
```

- Set 객체는 이터러블이다. 따라서 `for ... of` 문으로 순회할 수 있다.
- 스프레드 문법과 배열 디스트럭처링의 대상이 될 수도 있다.

### 37.1.8 집합 연산

- Set 객체는 수학적 집합을 구현하기 위한 자료구조다.

### **교집합**

```jsx
// 1
Set.prototype.interection = function (set) {
	const result = new Set()

	for (const value of set) {
		if (this.has(value)) result.add(value)
	}

	return result
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.interection(setB) // Set(2) {2, 4}
console.log(setB.interection(setA) // Set(2) {2, 4}

// 2
Set.prototype.interection = function (set) {
	return new Set([...this].filter(v => set.has(v)))
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.interection(setB) // Set(2) {2, 4}
console.log(setB.interection(setA) // Set(2) {2, 4}
```

### 합집합

```jsx
// 1
Set.prototype.union = function (set) {
	const result = new Set(this)

	for (const value of set) {
		result.add(value)
	}

	return result
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.union(setB) // Set(2) {1, 2, 3, 4}
console.log(setB.union(setA) // Set(2) {2, 4, 1, 3}

// 2
Set.prototype.union = function (set) {
	return new Set([...this, ...set])
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.union(setB) // Set(2) {1, 2, 3, 4}
console.log(setB.union(setA) // Set(2) {2, 4, 1, 3}
```

### 차집합

```jsx
// 1
Set.prototype.difference = function (set) {
	const result = new Set(this)

	for (const value of set) {
		result.delete(value)
	}

	return result
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.difference(setB) // Set(2) {1, 3}
console.log(setB.difference(setA) // Set(2) {0}

// 2
Set.prototype.difference = function (set) {
	return new Set([...this].filter(v => !set.has(v)))
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.difference(setB) // Set(2) {1, 3}
console.log(setB.difference(setA) // Set(2) {0}
```

### 부분 집합과 상위 집합

```jsx
// 1
Set.prototype.isSuperset = function (subset) {
	for (const value of subset) {
		if (!this.has(value) return false
	}

	return true
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.isSuperset(setB) // true
console.log(setB.isSuperset(setA) // false

// 2
Set.prototype.isSuperset = function (subset) {
	const supersetArr = [...this]
	return [...subset].every(v => supersetArr.includes(v))
}

const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 4])

console.log(setA.isSuperset(setB) // true
console.log(setB.isSuperset(setA) // false
```

## 37.2 Map

- Map 객체는 키와 값의 쌍으로 이러어진 컬렉션이다.
- Map 객체는 객체와 유사하지만 이터러블이라는 차이가 있다.

```jsx
const map = new Map()
console.log(map) // Map(0)

// 키와 값의 쌍으로 이루어진 이터러블을 인수로 전달받는다.
const map1 = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
])
console.log(map1) // Map(2) {'key1' => 'value1', 'key2' => 'value2'}

// 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다.
const map1 = new Map([
  ['key1', 'value1'],
  ['key1', 'value2']
])
console.log(map1) // Map(1) {'key1' => 'value2'}
```

### 37.2.2 요소 개수 확인

```jsx
Map.prototype.size
```

```jsx
const { size } = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
])
console.log(size) // 2
```

- `size` 프로퍼티는 setter 함수 없이 `getter` 함수만 존재하는 접근자 프로퍼티다.
- 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수를 변경할 수 없다.

### 37.2.3 요소 추가

```jsx
Map.prototype.set
```

```jsx
const map = new Map()
console.log(map) // Map(0) {}

map.set('key1', 'value1')
console.log(map) // Map(1) {'key1' => 'value1'}

map.set('key2', 'value2').set('key3', 'value3')

console.log(map) // Map(3) {'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3'}
```

- Map 객체는 `NaN`과 `NaN`을 같다고 평가하여 중복 추가를 허용하지 않는다. (비교연산자는 false)
- Map 객체는 `+0`과 `-0`을 같다고 평가하여 중복 추가를 허용하지 않는다. (비교연산자는 true)
- MAP 객체는 키 타입에 제한이 없다.
  - 일반 객체는 문자열 또는 심벌 값만 키로 사용할 수 있다.

```jsx
const map = new Map()

const lee = { name: 'Lee' }
const kim = { name: 'Kim' }

map.set(lee, 'developer').set(kim, 'designer')

console.log(map)
// Map(2) { {name: 'Lee' } => 'develper', { name: 'Kim' } => 'designer' }
```

### 37.2.4 요소 취득

```jsx
Map.prototype.get
```

- 인수로 전달한 키를 갖는 요소가 존재하지 않으면 undefined를 반환한다.

### 37.2.5 요소 존재 여부 확인

```jsx
Map.prototype.has
```

### 37.2.6 요소 삭제

```jsx
Map.prototype.delete
```

```jsx
const lee = { name: 'Lee' }
const kim = { name: 'Kim' }

const map = new Map([
  [lee, 'developer'],
  [kim, 'designer']
])

map.delete(kim)
console.log(map) // Map(1) {{name: 'Lee'} => 'developer'}

map.delete('key1') // 존재하지 않는 요소를 삭제하면 에러 없이 무시된다.
console.log(map) // Map(1) {{name: 'Lee'} => 'developer'}
```

- `delete` 메서드는 연속적으로 호출할 수 없다.

### 37.2.7 요소 일괄 삭제

```jsx
Map.prototype.clear
```

```jsx
const lee = { name: 'Lee' }
const kim = { name: 'Kim' }

const map = new Map([
  [lee, 'developer'],
  [kim, 'designer']
])

map.clear()
console.log(map) // Map() {}
```

### 37.2.8 요소 순회

```jsx
Map.prototype.forEach(현재_요소_값, 현재_요소_인덱스, 현재_Set_객체_자체)
```

- Map 객체는 이터러블이다. 따라서 `for ... of` 문으로 순회할 수 있다.
- 스프레드 문법과 배열 디스트럭처링의 대상이 될 수도 있다.
- Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.
  | Map method            | 설명                                                                  |
  | --------------------- | --------------------------------------------------------------------- |
  | Map.prototype.keys    | 요소키를 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환          |
  | Map.prototype.values  | 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환          |
  | Map.prototype.entries | 요소키와 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환 |
  ```jsx
  const lee = { name: 'Lee' }
  const kim = { name: 'Kim' }

  const map = new Map([
    [lee, 'developer'],
    [kim, 'designer']
  ])

  for (const key of map.keys()) {
    console.log(key) // {name: 'Lee'}, {name: 'Kim'}
  }

  for (const value of map.values()) {
    console.log(value) // developer, designer
  }

  for (const entry of map.entries()) {
    console.log(entry) // [{name: 'Lee'}, 'developer'] [{name: 'Kim'}, 'designer']
  }
  ```
