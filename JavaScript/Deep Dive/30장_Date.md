# 30장 Date

- 표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수다.
- UTC(협정 세계시)는 국제 표준시를 말한다. = GMT(그리니치 평균시)
- KST(한국 표준시)는 UTC에 9시간을 더한 시간이다.

## 30.1 Date 생성자 함수

- `Date`는 생성자 함수다.
- `Date` 생성자 함수로 생성한 `Date` 객체는 내부적으로 날짜와 시간을 나타내는 **정수값**을 갖는다.
  - 1970년 1월 1일 00:00:00(UTC)을 기점으로 Date 객체가 나타내는 날짜와 시간까지의 밀리초를 나타낸다. (정수값 `0`)
  - 1970년 1월 2월 0시 → 정수값 `86,400,000` (24h _ 60m _ 60s \* 1000ms)

### Date 생성자 함수로 객체를 생성하는 방법

```tsx
// 1️⃣ 현재 날짜와 시간
new Date() // Mon Jul 06 2020 01:03:18 GMT+0900 (KST)    → 객체
Date() // "Mon Jul 06 2020 01:03:18 GMT+0900 (KST)"  → 문자열

// 2️⃣ 1970년 1월 1일 00:00:00(UTC) 기점으로부터 전달된 밀리초만큼 경과한 날짜와 시간
new Date(0) // Thu Jan 01 1970 09:00:00 GMT+0900 (KST)

// 3️⃣ 전달된 날짜와 시간을 나타내는 Date
new Date('May 26, 2020 10:00:00') // Tue May 26 2020 10:00:00 GMT+0900 (KST)
new Date('2020/03/26/10:00:00') // Thu Mar 26 2020 10:00:00 GMT+0900 (KST)

// 4️⃣ 전달된 날짜와 시간을 나타내는 Date
// new Date(year, month[, day, hour, minute, second, millisecond])
new Date(2020, 2) // Sun Mar 01 2020 00:00:00 GMT+0900 (KST)
new Date(2020, 2, 26, 10, 00, 00, 0) // Thu Mar 26 2020 10:00:00 GMT+0900 (KST)
```

| 인수        | 내용                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| year        | 연을 나타내는 1900년 이후의 정수. 0부터 99는 1900부터 1999로 처리된다. |
| month       | 월을 나타내는 0 ~ 11까지의 정수 (0 = 1월)                              |
| day         | 일을 나타내는 1 ~ 31까지의 정수                                        |
| hour        | 시를 나타내는 0 ~ 23까지의 정수                                        |
| minute      | 분을 나타내는 0 ~ 59까지의 정수                                        |
| second      | 초를 나타내는 0 ~ 59까지의 정수                                        |
| millisecond | 밀리초를 나타내는 0 ~ 999까지의 정수                                   |

## 30.2 Date 메서드

### 30.2.1 Date.now

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

```tsx
const now = Date.now() // 1593971539112

new Date(now) // Mon Jul 06 2020 02:52:19 GMT+0900 (KST)
```

<img width="635" alt="image" src="https://user-images.githubusercontent.com/88878874/260965334-f4108cf4-739c-48db-8811-958d44a2b825.png">

### 30.2.2 Date.parse

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.

```tsx
// UTC
Date.parse('Jan 2, 1970 00:00:00 UTC') // 86400000

// KST
Date.parse('Jan 2, 1970 09:00:00') // 86400000

// KST
Date.parse('1970/01/02/09:00:00') // 86400000
```

### 30.2.3 Date.UTC

- 1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환한다.
- `new Date(year, month[, day, hour, minute, second, millisecond])`와 같은 형식의 인수를 사용해야 한다.
- 로컬 타임(KST)가 아닌 UTC로 인식된다.
- month는 0~11까지의 정수다.

### 30.2.4 Date.prototype.getFullYear

```tsx
new Date('2023/08/16').getFullYear // 2023
```

### 30.2.5 Date.prototype.setFullYear

```tsx
const today = new Date()

today.getFullYear() // 2023

today.setFullYear(2000)
today.getFullYear() // 2000

today.setFullYear(1900, 0, 1) // Mon Jan 01 1900 15:50:32 GMT+0827 (KST)
```

### 30.2.6 Date.prototype.getMonth

```tsx
new Date('2020/07/24').getMonth() // 6
```

### 30.2.7 Date.prototype.setMonth

```tsx
const today = new Date()

today.setMonth(0) // 1월
today.getMonth() // 0

today.setMonth(11, 1) // 12월 1일
today.getMonth() // 11
```

### 30.2.8 Date.prototype.getDate

```tsx
new Date('2020/07/24').getDate() // 24
```

### 30.2.9 Date.prototype.setDate

```tsx
const today = new Date()

today.setDate(1)
today.getDate() // 1
```

### 30.2.10 Date.prototype.getDay

- `Date` 객체의 요일을 나타내는 정수를 반환한다.

  | 요일   | 반환값 |
  | ------ | ------ |
  | 일요일 | 0      |
  | 월요일 | 1      |
  | 화요일 | 2      |
  | 수요일 | 3      |
  | 목요일 | 4      |
  | 금요일 | 5      |
  | 토요일 | 6      |

### 30.2.11 Date.prototype.getHours

```tsx
new Date('2020/07/25/12:00').getHours // 12
```

### 30.2.12 Date.prototype.setHours

```tsx
const today = new Date()

today.setHours(7)
today.getHours() // 7

today.setHours(0, 0, 0, 0) // 00:00:00:00
today.getHours() // 0
```

### 30.2.13 Date.prototype.getMinutes

```tsx
new Date('2020/07/24/12:30').getMinutes() // 30
```

### 30.2.14 Date.prototype.setMinutes

```tsx
const today = new Date()

today.setMinutes(50)
today.getMunutes() // 50

today.setMinutes(5, 10, 999)
today.getMinutes() // 5
```

### 30.2.15 Date.prototype.getSeconds

### 30.2.16 Date.prototype.setSeconds

### 30.2.17 Date.prototype.getMilliSeconds

### 30.2.18 Date.prototype.setMilliSeconds

### 30.2.19 Date.prototype.getTime

```tsx
new Date('2020/07/24/12:30').getTime() // 1595561400000
```

### 30.2.20 Date.prototype.setTime

```tsx
const today = new Date()

today.setTime(86400000)
conosole.log(today) // Fri Jan 02 1970 09:00:00 GTM+0900 (KST)
```

### 30.2.21 Date.prototype.getTimezoneOffset

- UTC와 `Date` 객체에 지정된 로캘(locale) 시간과의 차이를 분 단위로 반환한다.

```tsx
const today = new Date() // today의 지정 local은 KST다.

today.getTimezoneOffset() / 60 // -9
```

### 30.2.22 Date.prototype.toDateString

```tsx
const today = new Date('2020/7/24/12:30')

today.toString() // Fri Jul 24 2020 12:30:00 GMT+0900 (KST)
today.toDateStrig() // Fri Jul 24 2020
```

### 30.2.23 Date.prototype.toTimeString

```tsx
const today = new Date('2020/7/24/12:30')

today.toString() // Fri Jul 24 2020 12:30:00 GMT+0900 (KST)
today.toTimeString() // 12:30:00 GMT+0900 (KST)
```

### 30.2.24 Date.prototype.ToISOString

```tsx
const today = new Date('2020/7/24/12:30')

today.toString() // Fri Jul 24 2020 12:30:00 GMT+0900 (KST)
today.toISOString() // 2020-07-24T03:30:00.000Z

today.toISOString.slice(0, 10) // 2020-07-24
today.toISOString.slice(0, 10).replace(/-/g, '') // 20200724
```

### 30.2.25 Date.prototype.toLocaleString

```tsx
const today = new Date('2020/7/24/12:30')

today.toString() // Fri Jul 24 2020 12:30:00 GMT+0900 (KST)
today.toLocaleString() // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('ko-KR') // 2020. 7. 24. 오후 12:30:00
today.toLocaleString('en-US') // 7/24/2020 12:30:00 PM
today.toLocaleString('ja-JP') // 2020/7/24 12:30:00
```

### 30.2.26 Date.prototype.toLocaleTimeString

```tsx
const today = new Date('2020/7/24/12:30')

today.toString() // Fri Jul 24 2020 12:30:00 GMT+0900 (KST)
today.toLocaleTimeString() // 오후 12:30:00
today.toLocaleTimeString('ko-KR') // 오후 12:30:00
today.toLocaleTimeString('en-US') // 12:30:00 PM
today.toLocaleTimeString('ja-JP') // 12:30:00
```

### more

### ✅ Date.prototype.toLocaleDateString()

[Date.prototype.toLocaleDateString() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

```tsx
const today = new Date()
const options = {
	weekday: 'long',
	year: 'nemeric',
	month: '2-digit',
	day: '2-digit'
}

console.log(today)                // Wed Aug 16 2023 16:44:19 GMT+0900 (KST)
console.log(today.toLocaleDateString('ko-KR', options) // 2023. 08. 16. 수요일
```

- **localeMatcher**: 사용할 로캘 처리 알고리즘을 지정
  - **`lookup`**: 최상의 사용가능한 로캘을 찾는다.
  - **`best fit`**: 가장 잘 맞는 로캘을 선택한다. (기본값)
- **weekday**: 요일의 표시 방식을 지정
  - **`long`**: 예) Monday
  - **`short`**: 예) Mon
  - **`narrow`**: 예) M
- **year**: 연도의 표시 방식을 지정
  - **`numeric`**: 예) 2023
  - **`2-digit`**: 예) 23
- **month**: 월의 표시 방식을 지정
  - **`numeric`**: 예) 2
  - **`2-digit`**: 예) 02
  - **`long`**: 예) February
  - **`short`**: 예) Feb
  - **`narrow`**: 예) F
- **day**: 일의 표시 방식을 지정
  - **`numeric`**: 예) 9
  - **`2-digit`**: 예) 09

## 30.3 Date를 활용한 시계 예제

```tsx
;(function printNow() {
  const today = new Date()

  const dayNames = [
    '(일요일)',
    '(월요일)',
    '(화요일)',
    '(수요일)',
    '(목요일)',
    '(금요일)',
    '(토요일)'
  ]

  const day = dayNames[today.getDay()]

  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()
  let hour = today.getHours()
  let miunute = today.getMinutes()
  let second = today.getSeconds()
  const ampm = hour >= 12 ? 'PM' : 'AM'

  hour %= 12
  hour = hour || 12

  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`
})()
```

### ✅ toLocaleDateString, toLocaleTimeString으로 바꿔보기

```tsx
function printNow() {
  const today = new Date()

  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }

  const optionsTime = {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const formattedDate = today.toLocaleDateString('ko-KR', optionsDate)
  const formattedTime = today.toLocaleTimeString('ko-KR', optionsTime)

  const now = `${formattedDate} ${formattedTime}`

  console.log(now)
}

printNow()
```

- 개인적으로 가독성이나 **유지보수성**에서 더 뛰어나다고 생각한다.
- _‘년’, ‘일’, ‘월’_ 등의 하드 코딩이 사라진다.
- _hour %= 12_ 등의 평가식이 사라진다.
